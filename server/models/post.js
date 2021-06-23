import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
			max: 500,
		},
		img: String,
		likes: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);
export default Post;
