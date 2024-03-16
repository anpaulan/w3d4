const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('jsdb');

const users_create = () => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username VARCHAR(50),
        email VARCHAR(50),
        password VARCHAR(50))`);
};

const users_add = () => {
    db.run(`INSERT INTO users (username, email, password) VALUES (?,?,?)`);
};

const users_delete = (username) => {
    db.run(`DELETE FROM users WHERE username=?`, [username]);
};

const users_update_name = (username) => {
    db.run(`UPDATE users SET username=?`, [username]);
};

const users_update_email = (email) => {
    db.run(`UPDATE users SET email=?`, [email]);
};

const users_update_pw = (password) => {
    db.run(`UPDATE users SET password=?`, [password]);
};


const posts_create = () => {
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY,
        title VARCHAR(100),
        content LONGTEXT,
        author VARCHAR(50),
        FOREIGN KEY (author) REFERENCES users(username))`);
    };

const posts_update_title = (title) => {
    db.run(`UPDATE posts SET title=?`, [title]);
};
  
const posts_update_content = (id, content) => {
    db.run(`UPDATE posts WHERE id = ? SET content=?`, [id, content]);
};

const posts_delete = (id) => {
    db.run(`DELETE FROM posts WHERE id=?`, [id]);
};

const comments_create = () => {
db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY,
    content TEXT,
    commenter VARCHAR(50),
    post_ID INTEGER,
    FOREIGN KEY (commenter) REFERENCES users(username),
    FOREIGN KEY (post_ID) REFERENCES posts(id))`);
};

const comments_update = (id, content) => {
    db.run(`UPDATE comments WHERE id = ? SET content=?`, [content, id]);
};

const comment_delete = (id) => {
    db.run(`DELETE FROM comments WHERE id=?`, [id]);
};

users_create();
users_add();
users_delete();
users_update_email();
users_update_name();
users_update_pw();
posts_create();
posts_delete();
posts_update_content();
posts_update_title();
comments_create();
comment_delete();
comments_update();

module.exports = {
    db,
    users_create,
    users_add,
    users_delete,
    users_update_email,
    users_update_name,
    users_update_pw,
    posts_create,
    posts_delete,
    posts_update_content,
    posts_update_title,
    comments_create,
    comment_delete,
    comments_update,
}