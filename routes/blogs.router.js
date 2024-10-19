const router = require('express').Router();

const { getAllBlogs, getNewBlog, postNewBlog, getEditBlog, postEditBlog, postDeleteBlog, getSingleBlog } = require('../controllers/blogs.controller');

// * ルーティング
router.get('/', getAllBlogs);

router.get('/new', getNewBlog);
router.post('/create', postNewBlog);

router.get('/edit/:id', getEditBlog);
router.post('/update', postEditBlog);

router.post('/delete', postDeleteBlog);

router.get('/:id', getSingleBlog);

module.exports = router;