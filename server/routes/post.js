import express from 'express';
import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
	getPost,
	timeline,
} from '../controllers/post.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/timeline', timeline);
router.get('/:id', getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/like', likePost);

export default router;
