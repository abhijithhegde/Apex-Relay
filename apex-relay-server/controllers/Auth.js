import { connect } from "getstream";
import { StreamChat } from "stream-chat";
import bcrypt from "bcrypt";
import crypto from "crypto";
import "dotenv/config";

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const serverClient = connect(api_key, api_secret, app_id);
		const client = StreamChat.getInstance(api_key, api_secret);

		const { users } = await client.queryUsers({ username: username });
		
		if (!users.length)
			return res.status(400).json({ message: "User not found" });
		const success = await bcrypt.compare(password, users[0].hashedPassword);

		const token = serverClient.createUserToken(users[0].id);

		if (success) {
			res.status(200).json({
				token,
				fullName: users[0].fullName,
				username,
				userId: users[0].id,
			});
		} else {
			res.status(500).json({ message: "Incorrect Password!" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "error" });
	}
};

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, phoneNo, avatarURL } = req.body;
		const userId = crypto.randomBytes(16).toString("hex");

		const serverClient = connect(api_key, api_secret, app_id);

		const hashedPassword = await bcrypt.hashSync(password, 10);
		const token = serverClient.createUserToken(userId);

		res.status(200).json({
			token,
			fullName,
			username,
			userId,
			hashedPassword,
			phoneNo,
			avatarURL,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "error" });
	}
};
