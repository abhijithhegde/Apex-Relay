import { useState } from "react";
import PropsType from "prop-types";
import { useChatContext } from "stream-chat-react";

import { UserList } from "./";
import { CloseCreateChannel } from "../assets/CloseCreateChannel.jsx";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
	const handleChange = (e) => {
		e.preventDefault();
		setChannelName(e.target.value);
	};

	return (
		<div className="channel-name-input__wrapper">
			<p>Name</p>
			<input
				type="text"
				value={channelName}
				onChange={handleChange}
				placeholder="channel-name"
			/>
			<p>Add Members</p>
		</div>
	);
};

const CreateChannel = ({ createType, setIsCreating }) => {
	const { client, setActiveChannel } = useChatContext();
	const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
	const [channelName, setChannelName] = useState("");

	const createChannel = async (e) => {
		e.preventDefault();
		try {
			const newChannel = await client.channel(createType, channelName, {
				name: channelName,
				members: selectedUsers,
			});
			await newChannel.watch();
			setChannelName("");
			setIsCreating(false);
			setSelectedUsers([client.userID]);
			setActiveChannel(newChannel);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="create-channel__container">
			<div className="create-channel__header">
				<p>
					{createType === "team"
						? "Create a New Channel"
						: "Send a Direct Message"}
				</p>
				<CloseCreateChannel setIsCreating={setIsCreating} />
			</div>
			{createType === "team" && (
				<ChannelNameInput
					channelName={channelName}
					setChannelName={setChannelName}
				/>
			)}
			<UserList setSelectedUsers={setSelectedUsers} />
			<div
				className="create-channel__button-wrapper"
				onClick={createChannel}
			>
				<p>
					{createType === "team"
						? "Create Channel"
						: "Start Messaging"}
				</p>
			</div>
		</div>
	);
};

CreateChannel.propTypes = {
	createType: PropsType.string,
	setIsCreating: PropsType.func,
};

ChannelNameInput.propTypes = {
	channelName: PropsType.string.isRequired,
	setChannelName: PropsType.func.isRequired,
};

export default CreateChannel;
