from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError



class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(message='A comment is required')])
