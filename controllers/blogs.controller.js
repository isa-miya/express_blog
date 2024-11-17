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
        content,
        authorId: req.user.userId
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
    if (blog.authorId !== req.user.userId) {
      return res.status(403).send('権限エラーです');
    }
    res.render('edit-post', { blog });
  } catch (error) {
    res.status(500).send('Error');
  }
};
// * 記事更新アクション
exports.postEditBlog = async (req, res) => {
  const { blogId, title, description, content } = req.body;
  try {
    const blog = await prisma.blog.findUnique({ where: { id: parseInt(blogId) } });
    if (blog.authorId !== req.user.userId) {
      return res.status(403).send('権限エラーです');
    };
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
    const blog = await prisma.blog.findUnique({ where: { id: parseInt(blogId) } });
    if (blog.authorId !== req.user.userId) {
      return res.status(403).send('権限エラーです');
    }
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
    blog.formattedCreatedAt = blog.createdAt.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const isAuthor = req.user && blog.authorId === req.user.userId;
    res.render('post', { blog, isAuthor });
  } catch (error) {
    res.status(500).send('Error');
  }
};