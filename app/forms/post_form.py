from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import Post



def character_check(form, field):
    description = field.data

    if len(description.strip()) == 0:
        raise ValidationError('Description is required')
    if len(description) < 5 or len(description) > 100:
        raise ValidationError('Description must be between 5 and 100 characters')

class PostForm(FlaskForm):

    description = StringField('description', validators=[DataRequired(message="Description is required"), character_check])
    imageUrl = StringField('imageUrl', validators=[DataRequired(), URL(require_tld=True, message='Invalid url')])
