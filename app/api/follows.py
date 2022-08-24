from flask import Blueprint
from app.models import Comment, db, User
from flask_login import login_required, current_user



follows_route = Blueprint('follows', __name__)

@follows_route.post('/follow/<int:id>')
@login_required
def follow(id):
    user = User.query.get(id)
    if current_user not in user.followers:
        user.followers.append(current_user)
        db.session.commit()
        # current_user.following.append(user)
        return {'current_user': current_user.to_dict()}
        # return {'message': f"{current_user.username} followed {user.username}" }
    else:
        return {'message': 'Already following'}
        # return {'message': f"{current_user.username} unfollowed {user.username}" }


@follows_route.post('/unfollow/<int:id>')
@login_required
def unfollow(id):
    user = User.query.get(id)
