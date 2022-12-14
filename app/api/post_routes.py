from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.s3_image_upload import get_unique_filename, upload_file_to_s3
from app.models import User, Post, db, Comment
from app.forms import PostForm, CommentForm

post_routes = Blueprint('posts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@post_routes.get('/')
def get_all_posts():
    all_posts = Post.query.all()
    response = {'allPosts': [post.to_dict_with_user() for post in all_posts]}
    return response


# use current_user for interacting with current logged in user
# and making new post with user_id (current set to get to view curr_user object)
@post_routes.post('/')
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        print(data)
        new_post = Post(
            image_url = data['imageUrl'],
            description = data['description'],
            user_id = current_user.id
        )
        db.session.add(new_post)
        db.session.commit()
        return {'new_post': new_post.to_dict_with_user()}

    # Return the validation errors, and put 403 at end
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403


@post_routes.put('/<int:id>')
@login_required
def edit_post(id):
    form = PostForm()
    post = Post.query.get_or_404(id)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        post.image_url = data['imageUrl']
        post.description = data['description']
        db.session.commit()
        return {'post': post.to_dict_with_user()}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403


# get all posts by users that the logged in user follows for feed
# Post.query.filter(post.user_id in user.following).all()
# @post_routes.get('/feed')
# @login_required
# def get_customized_feed():
#     customized_posts = Post.query.filter(Post.user_id in current_user.following).all()
#     return {'myFeed': [post.to_dict_with_user() for post in customized_posts]}


# # get all posts by current user for profile page
# @post_routes.get('/me') # or current_user.id?
# @login_required
# def get_my_posts():
#     my_posts = Post.query.filter(Post.user_id == current_user.id).all()
#     return {'myPosts': [post.to_dict_with_user() for post in my_posts]}
# # get all posts for specific user at specific user's profile page


@post_routes.delete('/<int:id>')
@login_required
def delete_post(id):
    post = Post.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return {'message': 'Successfully deleted'}

##backend routes for liking/unliking a post. should be similar to comment_likes
@post_routes.post('/<int:id>/likes')
@login_required
def like_unlike_a_post(id):
    post = Post.query.get(id)
    if current_user not in post.post_likes:
        post.post_likes.append(current_user)
        db.session.commit()
    else:
        post.post_likes.remove(current_user)
        db.session.commit()
    return { 'post': post.to_dict_with_user()}


# Get all comments for a post based off of post id
@post_routes.get('/<int:id>/comments')
@login_required
def get_comments(id):
    comments = Comment.query.filter(Comment.post_id == id)

    comments_list_dict = [comment.comment_to_dict_user() for comment in comments]
    return {'Comments': comments_list_dict}


# Create  a comment for a post
@post_routes.post('/<int:id>/comments')
@login_required
def create_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            comment=form.data['comment'],
            user_id=current_user.id,
            post_id=id
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.comment_to_dict_user()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
