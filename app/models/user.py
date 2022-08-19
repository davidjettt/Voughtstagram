from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

follows = db.Table(
    'follows',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('following_id', db.Integer, db.ForeignKey('users.id'))
)

post_likes = db.Table(
    'post_likes',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('posts', db.Integer, db.ForeignKey('posts.id'), primary_key=True)
)

# comment_likes = db.Table(
#     'comment_likes',
#     db.Model.metadata,
#     db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('comments', db.Integer, db.ForeignKey('comments.id'), primary_key=True)
# )

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(255))
    avatar = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    followers = db.relationship(
            'User',
            secondary=follows,
            primaryjoin=(follows.c.follower_id == id),
            secondaryjoin=(follows.c.following_id == id),
            backref=db.backref("following", lazy="dynamic"),
            lazy="dynamic",
            cascade='all, delete'
        )

    posts = db.relationship('Post', back_populates='user', cascade='all, delete')  # User can have many posts
    user_post_likes = db.relationship('Post', secondary=post_likes, back_populates='post_likes', cascade='all, delete')

    comments = db.relationship('Comment', back_populates='user', cascade='all, delete')  # User can have many comments
    # user_comment_likes = db.relationship('Comment', secondary=comment_likes, back_populates='comment_likes', cascade='all, delete')


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='posts')  # Post can only belong to one user
    post_likes = db.relationship('User', secondary=post_likes, back_populates='user_post_likes', cascade='all, delete')

    post_comments = db.relationship('Comment', back_populates='post', cascade='all, delete') #  Post can have many comments




class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='comments')  # Comment can only belong to one user
    post = db.relationship('Post', back_populates='post_comments')  # Comment can only belong to one post

    # comment_likes = db.relationship('CommentLike', secondary=comment_likes, back_populates='user_comment_likes', cascade='all, delete')
