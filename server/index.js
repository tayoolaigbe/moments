import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import postRoutes from './routes/post.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	},
	() => {
		console.log('Connected to MONGO');
	}
);

app.use('/user', userRoutes);
app.use('/post', postRoutes);

app.get('/user', (req, res) => res.send('Welcome to User page'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
