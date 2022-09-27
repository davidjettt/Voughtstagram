from flask import Blueprint, request
from flask_login import login_required
from app.models import User, db
from app.forms import UserSettingsForm
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.put('/<int:id>/settings')
@login_required
def user_settings(id):
    user = User.query.get(id)
    form = UserSettingsForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        user.name = data['name']
        user.username = data['username']
        user.email = data['email']
        user.bio = data['bio']

        db.session.commit()

        return user.to_dict()

    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


@user_routes.put('/<int:id>/avatar/upload')
@login_required
def avatar_upload(id):
    user = User.query.get(id)


@user_routes.put('/<int:id>/avatar/remove')
@login_required
def avatar_remove(id):
    user = User.query.get(id)

    user.avatar = None

    db.session.commit()

    return user.to_dict()
