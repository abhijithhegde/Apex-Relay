import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import signinImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {
	fullName: "",
	username: "",
	password: "",
	confirmPassword: "",
	phoneNo: "",
	avatarURL: "",
};

const Auth = () => {
	const [isSignUp, setIsSignUp] = useState(true);
	const [form, setForm] = useState(initialState);
	const backendURL = import.meta.env.VITE_BACKEND_URL;

	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp);
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { username, password, phoneNo, avatarURL } = form;
		const {
			data: { token, userId, hashedPassword, fullName },
		} = await axios.post(
			`${backendURL}/auth/${isSignUp ? "signup" : "login"}`,
			{
				username,
				fullName: form.fullName,
				password,
				phoneNo,
				avatarURL,
			}
		);
		cookies.set("token", token);
		cookies.set("username", username);
		cookies.set("fullName", fullName);
		cookies.set("userId", userId);

		if (isSignUp) {
			cookies.set("avatarURL", avatarURL);
			cookies.set("phoneNo", phoneNo);
			cookies.set("hashedPassword", hashedPassword);
		}
		window.location.reload();
	};

	return (
		<div className="auth__form-container">
			<div className="auth__form-container_fields">
				<div className="auth__form-container_fields-content">
					<p>{isSignUp ? "Sign Up" : "Sign In"} </p>
					<form onSubmit={handleSubmit}>
						{isSignUp && (
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="fullName">Full Name</label>
								<input
									name="fullName"
									type="text"
									placeholder="Full Name"
									onChange={handleChange}
									required
								/>
							</div>
						)}
						<div className="auth__form-container_fields-content_input">
							<label htmlFor="username">Username</label>
							<input
								name="username"
								type="text"
								placeholder="Username"
								onChange={handleChange}
								required
							/>
						</div>
						{isSignUp && (
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="phoneNo">Phone No</label>
								<input
									name="phoneNo"
									type="text"
									placeholder="Phone No"
									onChange={handleChange}
									required
								/>
							</div>
						)}
						{isSignUp && (
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="avatarURL">Avatar URL</label>
								<input
									name="avatarURL"
									type="text"
									placeholder="URL"
									onChange={handleChange}
									required
								/>
							</div>
						)}
						<div className="auth__form-container_fields-content_input">
							<label htmlFor="password">Password</label>
							<input
								name="password"
								type="password"
								placeholder="Password"
								onChange={handleChange}
								required
							/>
						</div>
						{isSignUp && (
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="confirmPassword">
									Confirm Password
								</label>
								<input
									name="confirmPassword"
									type="password"
									placeholder="Confirm Password"
									onChange={handleChange}
									required
								/>
							</div>
						)}
						<div className="auth__form-container_fields-content_button">
							<button>{isSignUp ? "Sign Up" : "Sign In"} </button>
						</div>
					</form>
					<div className="auth__form-container_fields-account">
						<p>
							{isSignUp
								? "Already have an Account? "
								: "Don't have an Account? "}
							<span onClick={switchMode}>
								{isSignUp ? "Sign In" : "Sign Up"}
							</span>
						</p>
					</div>
				</div>
			</div>
			<div className="auth__form-container_image">
				<img src={signinImage} alt="Sign In" />
			</div>
		</div>
	);
};

export default Auth;
