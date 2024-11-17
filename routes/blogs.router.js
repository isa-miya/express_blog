const router = require('express').Router();

const { getAllBlogs, getNewBlog, postNewBlog, getEditBlog, postEditBlog, postDeleteBlog, getSingleBlog } = require('../controllers/blogs.controller');
const { protectRoute } = require('../utils/auth');

// * ルーティング
router.get('/', getAllBlogs);

router.get('/new', protectRoute, getNewBlog);
router.post('/create', protectRoute, postNewBlog);

router.get('/edit/:id', protectRoute, getEditBlog);
router.post('/update', protectRoute, postEditBlog);

router.post('/delete', protectRoute, postDeleteBlog);

router.get('/:id', getSingleBlog);

module.exports = router;