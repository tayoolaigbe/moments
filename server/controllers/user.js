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
