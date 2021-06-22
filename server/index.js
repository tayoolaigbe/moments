import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log('Connected to MONGO');
	}
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
