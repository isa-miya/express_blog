const express = require('express');
const path = require('path');
const blogsRouter = require('./routes/blogs.router');
// # auth.router.jsファイルを読み込み
const authRouter = require('./routes/auth.router');

// * expressの初期化
const app = express();

// * アプリケーションの設定
app.set('view engine', 'ejs');

// * ミドルウェア
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json(), express.urlencoded({ extended: true }));

// * ルーティング
app.use('/blogs', blogsRouter);
// # ルーティングを設定
app.use('/auth', authRouter);

app.listen(8080, () => {
  console.log('Server is running.');
});