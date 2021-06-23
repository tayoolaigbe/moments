import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import User from '../models/user.js';

export const signup = async (req, res) => {
	const { email, userName, firstName, lastName, password, confirmPassword } =
		req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser)
			return res.status(400).json({ message: 'User already exist!' });

		if (password !== confirmPassword)
			return res.status(400).json({ message: 'Passwords don"t match' });

		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
			username: userName,
		});
		const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
			expiresIn: '1h',
		});

		res.status(201).json({ result, token });
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser)
			return res.status(404).json({ message: 'User does not exist!' });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Invalid credentials' });

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			'test',
			{ expiresIn: '1h' }
		);

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No User with that Id`);

	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true }
		);

		const { password, ...others } = updatedUser._doc;

		res.status(200).json(others);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No User with that Id`);

	try {
		await User.findByIdAndRemove(id);

		res.status(200).json('Account deleted Successfully');
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getUser = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No User with that Id`);

	try {
		const user = await User.findById(id);

		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const follow = async (req, res) => {
	const { id } = req.params;
	if (req.body.userId !== req.params.id) {
		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(404).send(`No User with that Id`);

		try {
			const user = await User.findById(id);
			const currentUser = await User.findById(req.body.userId);
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				await currentUser.updateOne({ $push: { following: id } });
				res.status(200).json('User has been followed');
			} else {
				res.status(403).send(`You already follow this user`);
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).send(`You cant follow yourself`);
	}
};

export const unfollow = async (req, res) => {
	const { id } = req.params;
	if (req.body.userId !== req.params.id) {
		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(404).send(`No User with that Id`);

		try {
			const user = await User.findById(id);
			const currentUser = await User.findById(req.body.userId);
			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				await currentUser.updateOne({ $pull: { following: id } });
				res.status(200).json('User has been unfollowed');
			} else {
				res.status(403).send(`You already unfollow this user`);
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).send(`You cant unfollow yourself`);
	}
};
