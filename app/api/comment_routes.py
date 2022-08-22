from flask import Blueprint, request
from app.models import Comment, db
from flask_login import login_required
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
        print(updated_comment, "***********************************")
        updated_comment.comment = data['comment']
        db.session.commit()
        return {"updated_comment": updated_comment.comment_to_dict_user()}

@comment_routes.delete('/<int:comment_id>')
@login_required
def delete_comment(comment_id):
    comment = Comment.query.filter(Comment.id == comment_id).one()
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Successfully deleted comment'}
