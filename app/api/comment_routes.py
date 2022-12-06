from flask import Blueprint, request
from app.models import Comment, db, User
from flask_login import login_required, current_user
from app.forms import CommentForm


comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


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
    if form.validate_on_submit():
        data = form.data
        updated_comment = Comment.query.filter(Comment.id == comment_id).one()
        updated_comment.comment = data['comment']
        db.session.commit()
        return {"updated_comment": updated_comment.comment_to_dict_user()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@comment_routes.delete('/<int:comment_id>')
@login_required
def delete_comment(comment_id):
    comment = Comment.query.filter(Comment.id == comment_id).one()
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Successfully deleted comment'}


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
