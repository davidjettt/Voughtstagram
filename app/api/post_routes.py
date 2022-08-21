from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, Post

post_routes = Blueprint('posts', __name__)

@post_routes.get('/')
def get_all_posts():
    all_posts = Post.query.all()
    response = {'allPosts': [x.to_dict_with_user() for x in all_posts]}
    return response


# create new post

# use current_user for interacting with current logged in user
# and making new post with user_id (current set to get to view curr_user object)
@post_routes.get('/')
@login_required
def create_post():
    return {'my_info': current_user.to_dict()}

# get all posts by users that the logged in user follows for feed
# Post.query.filter(post.user_id in user.following).all()


# get all posts by current user for profile page
# Post.query.filter(Post.user_id == curr_user.id)


# get all posts for specific user at specific user's profile page
