from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError


def empty_comment(form, field):
    #checking is comment field is empty
    comment= field.data
    

class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(message='A comment is required')])
