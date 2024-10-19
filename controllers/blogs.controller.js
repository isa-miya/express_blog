const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// * 記事一覧取得のアクション
exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await prisma.blog.findMany();
    res.render('index', { allBlogs });
  } catch (error) {
    res.status(500).send('Error');
  }
};

// * 記事投稿画面表示のアクション
exports.getNewBlog = (req, res) => {
  res.render('new-post');
};
// * 記事投稿アクション
exports.postNewBlog = async (req, res) => {
  const { title, description, content } = req.body;
  try {
    await prisma.blog.create({
      data: {
        title,
        description,
        content
      }
    });
    res.redirect('/blogs');
  } catch (error) {
    res.status(500).send('Error');
  }
};

// * 記事編集画面表示のアクション
exports.getEditBlog = async (req, res) => {
  const blogId = parseInt(req.params.id);
  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });
    res.render('edit-post', { blog });
  } catch (error) {
    res.status(500).send('Error');
  }
};
// * 記事更新アクション
exports.postEditBlog = async (req, res) => {
  const { blogId, title, description, content } = req.body;
  try {
    await prisma.blog.update({
      where: { id: parseInt(blogId) },
      data: {
        title,
        description,
        content
      }
    });
    res.redirect('/blogs');
  } catch (error) {
    res.status(500).send('Error');
  }
};

// * 記事削除アクション
exports.postDeleteBlog = async (req, res) => {
  const { blogId } = req.body;
  try {
    await prisma.blog.delete({
      where: { id: parseInt(blogId) }
    });
    res.redirect('/blogs');
  } catch (error) {
    res.status(500).send('Error');
  }
};

// * 記事詳細画面取得アクション
exports.getSingleBlog = async (req, res) => {
  const blogId = parseInt(req.params.id);
  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });
    // # 以下のコードを追加
    blog.formattedCreatedAt = blog.createdAt.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    res.render('post', { blog });
  } catch (error) {
    res.status(500).send('Error');
  }
};