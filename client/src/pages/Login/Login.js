import './login.css';

const Login = () => {
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
						<input placeholder="Email" type="Email" className="loginInput" />
						<input placeholder="Password" type="Email" className="loginInput" />
						<button className="loginButton">Log In</button>
						<span className="loginForgot">Forgot Password?</span>
						<button className="loginRegisterButton">
							Create a New Account
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
