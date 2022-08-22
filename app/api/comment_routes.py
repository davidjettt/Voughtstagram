from flask import Blueprint, request
from app.models import Comment, db, User
from flask_login import login_required, current_user
from app.forms import CommentForm


comment_routes = Blueprint('comments', __name__)


# Get all comments
@comment_routes.get('/')
def all_comments():
    comments = Comment.query.all()
    comments_list_dict = [comment.comment_to_dict_user() for comment in comments]
    return { 'allComments': comments_list_dict }

@comment_routes.put('/<int:comment_id>')
@login_required
def update_comment(comment_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # comment = Comment.query.get(comment_id)
    if form.validate_on_submit():
        data = form.data
        # update = Comment.update().values(
        #     comment = data['comment']
        # ).where(Comment.id == comment_id)
        updated_comment = Comment.query.filter(Comment.id == comment_id).one()
        # print(updated_comment, "***********************************")
        updated_comment.comment = data['comment']
        db.session.commit()
        return {"updated_comment": updated_comment.comment_to_dict_user()}

<<<<<<< HEAD
@comment_routes.delete('/<int:comment_id>')
@login_required
def delete_comment(comment_id):
    comment = Comment.query.filter(Comment.id == comment_id).one()
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Successfully deleted comment'}
=======

# LIKE AND UNLIKE A COMMENT
@comment_routes.post('/<int:comment_id>/likes')
@login_required
def like_unlike_a_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if current_user not in comment.comment_likes:
        comment.comment_likes.append(current_user)
        db.session.commit()
    else:
        comment.comment_likes.remove(current_user)
        db.session.commit()
    return { 'liked_users': [user.to_dict() for user in comment.comment_likes] }
>>>>>>> comment-likes
