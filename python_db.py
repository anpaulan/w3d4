from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# Created the SQLite database.
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

app.app_context().push()

class UserTable(db.Model):
    __tablename__ = "user_table"
    UserID = db.Column(db.Integer, primary_key = True, nullable=False)
    user_name = db.Column(db.String(50), nullable=False)
    user_email = db.Column(db.String(50), nullable=False)
    user_password = db.Column(db.String(50), nullable=False)
    posts = db.relationship('PostsModel', backref="author", lazy = True)
    comments = db.relationship('CommentsModel', backref ='commenter', lazy = True)

class PostsTable(db.Model):
    __tablename__ = 'posts_table'
    PostID= db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user_model.UserID'), nullable = False)
    PostContent = db.Column(db.String())

class CommentsTable(db.Model):
    __tablename__ = 'comments_table'
    CommentID = db.Column(db.Integer, primary_key=True)
    PostsID = db.Column(db.Integer,  db.ForeignKey('posts_table.PostID'), nullable = False)
    comment_id = db.Column(db.Integer, db.ForeignKey('user_table.UserID'), nullable = False)
    CommentContent = db.Column(db.String())

user_posts = db.relationship('PostsTable', primaryjoin="UserTable.UserID == PostsTable.author_id", lazy='select')


db.create_all()