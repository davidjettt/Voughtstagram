from flask import Blueprint
from app.models import Comment


comment_routes = Blueprint('comments', __name__)


# Get all comments
@comment_routes.get('/')
def all_comments():
    comments = Comment.query.all()
    comments_list_dict = [comment.comment_to_dict_user() for comment in comments]
    return { 'allComments': comments_list_dict }
