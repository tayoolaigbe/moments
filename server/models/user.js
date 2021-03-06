import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			min: 5,
			max: 20,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			require: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			require: true,
			min: 6,
		},
		profilePicture: {
			type: String,
			default: '',
		},
		coverPicture: {
			type: String,
			default: '',
		},
		followers: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: [],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		bio: {
			type: String,
			max: 80,
			default: '',
		},
		location: {
			type: String,
			max: 50,
			default: '',
		},
		relationship: {
			type: String,
			default: '',
			max: 20,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
