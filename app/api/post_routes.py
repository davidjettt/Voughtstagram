from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, Post, db

post_routes = Blueprint('posts', __name__)

@post_routes.get('/')
def get_all_posts():
    all_posts = Post.query.all()
    response = {'allPosts': [post.to_dict_with_user() for post in all_posts]}
    return response


# use current_user for interacting with current logged in user
# and making new post with user_id (current set to get to view curr_user object)
@post_routes.post('/')
@login_required
def create_post():
    new_post = Post(
        image_url = 'test',
        description = 'test',
        user_id = current_user.id
    )
    db.session.add(new_post)
    db.session.commit()

    return {'new_post': new_post.to_dict_with_user()}

# get all posts by users that the logged in user follows for feed
# Post.query.filter(post.user_id in user.following).all()
@post_routes.get('/feed')
@login_required
def get_customized_feed():
    customized_posts = Post.query.filter(Post.user_id in current_user.following).all()
    return {'myFeed': [post.to_dict_with_user() for post in customized_posts]}


# get all posts by current user for profile page
@post_routes.get('/me') # or current_user.id?
@login_required
def get_my_posts():
    my_posts = Post.query.filter(Post.user_id == current_user.id).all()
    return {'myPosts': [post.to_dict_with_user() for post in my_posts]}
# get all posts for specific user at specific user's profile page


@post_routes.delete('/<int:id>')
@login_required
def delete_post(id):
    post = Post.query.get_or_404(id)
    # delete the post
    return {'message': 'Successfully deleted'}
