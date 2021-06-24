import './profile.css';
import Navbar from '../../components/Navbar/Navbar';
import Rightbar from '../../components/Rightbar/Rightbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Feed from '../../components/Feed/Feed';

const Profile = () => {
	return (
		<>
			<Navbar />
			<div className="profile">
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								className="profileCoverImg"
								src="/assets/post/3.jpeg"
								alt=""
							/>
							<img
								className="profileUserImg"
								src="/assets/person/7.jpeg"
								alt=""
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">Eyitayo Olaigbe</h4>
							<span className="profileInfoDescription">
								Hello my programming friends
							</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed />
						<Rightbar Profile />
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
