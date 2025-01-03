import { useState } from "react";
import PropTypes from "prop-types";
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

const EditChannel = ({ setIsEditing }) => {
	const { channel } = useChatContext();
	const [channelName, setChannelName] = useState(channel?.data?.name);
	const [selectedUsers, setSelectedUsers] = useState([]);

	const updateChannel = async (e) => {
		e.preventDefault();

		const nameChanged =
			channelName !== (channel.data.name || channel.data.id);

		if (nameChanged) {
			await channel.update(
				{ name: channelName },
				{ text: `Channel name changed to ${channelName}` }
			);
		}

		if (selectedUsers.length) {
			await channel.addMembers(selectedUsers);
		}

		setChannelName("");
		setIsEditing(false);
		setSelectedUsers([]);
	};

	return (
		<div className="edit-channel__container">
			<div className="edit-channel__header">
				<p>Edit Channel</p>
				<CloseCreateChannel setIsEditing={setIsEditing} />
			</div>
			<ChannelNameInput
				channelName={channelName}
				setChannelName={setChannelName}
			/>
			<UserList setSelectedUsers={setSelectedUsers} />
			<div
				className="edit-channel__button-wrapper"
				onClick={updateChannel}
			>
				<p>Save Changes</p>
			</div>
		</div>
	);
};

ChannelNameInput.propTypes = {
	channelName: PropTypes.string,
	setChannelName: PropTypes.func,
};

EditChannel.propTypes = {
	setIsEditing: PropTypes.func,
};

export default EditChannel;
