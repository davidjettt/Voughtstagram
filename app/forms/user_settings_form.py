from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_login import current_user

def user_exists(form, field):
    # Checking if user exists minus the current user
    email = field.data
    users = User.query.all()
    filtered_email_list = [ user.email for user in users if user.email != current_user.email ]

    if email in filtered_email_list:
        raise ValidationError('Email address already in use')


def username_exists(form, field):
    # Checking if username is already in use minus the username of the current user
    username = field.data
    users = User.query.all()
    filtered_username_list = [user.username for user in users if user.username != current_user.username ]

    if username in filtered_username_list:
        raise ValidationError('Username is already in use')

class UserSettingsForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(message='Email is required'), Email(message='Invalid email address'), user_exists])
    username = StringField('username', validators=[DataRequired(message='Username is required'), username_exists])
    name = StringField('name')
    bio = StringField('bio')
