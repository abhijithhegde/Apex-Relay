import { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import "stream-chat-react/dist/css/index.css";

import {
	ChannelContainer,
	ChannelListContainer,
	Auth,
} from "./components/index.js";

const cookies = new Cookies();
const authToken = cookies.get("token");

const client = StreamChat.getInstance(import.meta.env.VITE_STREAM_API_KEY);

if (authToken) {
	client.connectUser(
		{
			id: cookies.get("userId"),
			username: cookies.get("username"),
			fullName: cookies.get("fullName"),
			image: cookies.get("avatarURL"),
			hashedPassword: cookies.get("hashedPassword"),
			phoneNumber: cookies.get("phoneNo"),
		},
		authToken
	);
}

const App = () => {
	const [createType, setCreateType] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	if (!authToken) return <Auth />;

	return (
		<div className="app__wrapper">
			<Chat client={client} theme="team dark">
				<ChannelListContainer
					isCreating={isCreating}
					setIsCreating={setIsCreating}
					setIsEditing={setIsEditing}
					setCreateType={setCreateType}
				/>
				<ChannelContainer
					isCreating={isCreating}
					setIsCreating={setIsCreating}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					createType={createType}
				/>
			</Chat>
		</div>
	);
};

export default App;
