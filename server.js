const express = require('express');
const path = require('path');
// # blogs.router.jsファイルを読み込み
const blogsRouter = require('./routes/blogs.router');

// * expressの初期化
const app = express();

// * アプリケーションの設定
app.set('view engine', 'ejs');

// * ミドルウェア
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json(), express.urlencoded({ extended: true }));

// * ルーティング
// # ルーティングを設定
app.use('/blogs', blogsRouter);

app.listen(8080, () => {
  console.log('Server is running.');
});