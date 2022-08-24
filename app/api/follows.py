from flask import Blueprint
from app.models import Comment, db, User
from flask_login import login_required, current_user



follows_route = Blueprint('follows', __name__)

@follows_route.post('/follow/<int:id>')
@login_required
def follow(id):
    user = User.query.get(id)

    if user.id == current_user.id:
        return {'message': 'Cannot follow yourself'}, 400

    if current_user not in user.followers:
        user.followers.append(current_user)
        db.session.commit()
        return {'current_user': current_user.to_dict()}

    else:
        return {'message': 'You are already following this user'}, 400
        # return {'message': f"{current_user.username} unfollowed {user.username}" }


@follows_route.post('/unfollow/<int:id>')
@login_required
def unfollow(id):
    user = User.query.get(id)
    if current_user in user.followers:
        user.followers.remove(current_user)
        db.session.commit()
        return {'current_user': current_user.to_dict()}
    else:
        return {'message': 'You were not following this user'}, 400
