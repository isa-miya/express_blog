const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { checkAuth } = require('./utils/auth');

const blogsRouter = require('./routes/blogs.router');
const authRouter = require('./routes/auth.router');

// * expressの初期化
const app = express();

// * アプリケーションの設定
app.set('view engine', 'ejs');

// * ミドルウェア
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json(), express.urlencoded({ extended: true }), cookieParser());
app.use(checkAuth);

// * ルーティング
app.use('/blogs', blogsRouter);
app.use('/auth', authRouter);

app.listen(8080, () => {
  console.log('Server is running.');
});