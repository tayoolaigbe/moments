import { MoreVert } from '@material-ui/icons';
import './post.css';
import { Users } from '../../dummyData';
import { useState } from 'react';

const Post = ({ post }) => {
	const [likes, setLikes] = useState(post.likes);
	const [isLiked, setIsLiked] = useState(false);

	const handleLike = () => {
		setLikes(isLiked ? likes - 1 : likes + 1);
		setIsLiked(!isLiked);
	};
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<img
							className="postProfileImg"
							src={Users.filter(u => u.id === post.userId)[0].profilePicture}
							alt=""
						/>
						<span className="postUsername">
							{Users.filter(u => u.id === post.userId)[0].username}
						</span>
						<span className="postDate">{post.date}</span>
					</div>
					<div className="postTopRight">
						<MoreVert />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post?.description}</span>
					<img className="postImg" src={post.photo} alt="" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img
							className="likeIcon"
							src="/assets/like.png"
							onClick={handleLike}
							alt=""
						/>
						<img
							className="likeIcon"
							src="/assets/heart.png"
							onClick={handleLike}
							alt=""
						/>
						<span className="postLikeCounter">{likes} people liked it</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">{post.comment} comments</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
