import './register.css';

const Register = () => {
	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Moments</h3>
					<span className="loginDescription">
						Connects on with people around you on Moments
					</span>
				</div>
				<div className="loginRight">
					<div className="loginBox">
						<input placeholder="Username" className="loginInput" />
						<input placeholder="Password" type="Email" className="loginInput" />
						<button className="loginButton">Sign Up</button>
						<button className="loginRegisterButton">Log in</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
