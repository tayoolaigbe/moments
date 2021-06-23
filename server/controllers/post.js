import mongoose from 'mongoose';

import Post from '../models/post.js';

export const getPosts = async (req, res) => {
	try {
		const posts = await Post.find();

		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const createPost = async (req, res) => {
	const post = req.body;

	const newPost = new Post({
		...post,
		createdAt: new Date().toISOString(),
	});
	try {
		await newPost.save();

		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json(error.message);
	}
};

export const updatePost = async (req, res) => {
	const { id } = req.params;
	const { description, img, likes } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No Post with that Id`);

	try {
		const updatedPost = {
			description,
			img,
			likes,
		};

		await Post.findByIdAndUpdate(id, updatedPost, { new: true });

		res.status(200).json(updatedPost);
	} catch (error) {
		console.log(error.message);
	}
};

export const deletePost = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No Post with that Id`);

	try {
		await Post.findByIdAndRemove(id);

		res.json('Post deleted Successfully');
	} catch (error) {
		console.log(error);
	}
};

export const likePost = async (req, res) => {
	const { id } = req.params;

	try {
		// if (!req.userId) return res.json({ message: 'Unauthenticated' });

		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(404).send(`No Post with that Id`);

		const post = await Post.findById(id);

		if (!post.likes.includes(req.body.userId)) {
			await post.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json('The post has been liked');
		} else {
			await post.updateOne({ $pull: { likes: req.body.userId } });
			res.status(200).json('The post has been disliked');
		}
	} catch (error) {
		console.log(error);
	}
};

export const getPost = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await Post.findById(id);
		res.status(200).json(post);
	} catch (error) {
		console.log(error);
	}
};

export const timeline = async (req, res) => {
	try {
		const currentUser = await User.findById(req.body.userId);
		const userPosts = await Post.find({ userId: currentUser._id });
		const friendPosts = await Promise.all(
			currentUser.followings.map(friendId => {
				return Post.find({ userId: friendId });
			})
		);
		res.json(userPosts.concat(...friendPosts));
	} catch (err) {
		res.status(500).json(err);
	}
};
