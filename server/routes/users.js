import express from 'express';
import {
	signup,
	signin,
	updateUser,
	deleteUser,
	getUser,
	follow,
	unfollow,
} from '../controllers/user.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUser);
router.patch('/:id/follow', follow);
router.patch('/:id/unfollow', unfollow);

export default router;
