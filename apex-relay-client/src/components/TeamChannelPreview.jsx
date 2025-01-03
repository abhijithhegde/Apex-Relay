import PropType from "prop-types";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({
	setActiveChannel,
	channel,
	type,
	setToggleContainer,
	setIsCreating,
	setIsEditing,
}) => {
	const { channel: activeChannel, client } = useChatContext();

	const ChannelPreview = () => (
		<p className="channel-preview__item">
			# {channel?.data?.name || channel?.data?.id}
		</p>
	);

	const DirectPreview = () => {
		const members = Object.values(channel.state.members).filter(
			({ user }) => user.id !== client.userID
		);

		return (
			<div className="channel-preview__item single">
				<Avatar
					image={members[0]?.user?.image}
					name={members[0]?.user?.fullName || members[0]?.user?.id}
					size={24}
				/>
				<p>{members[0]?.user?.fullName ||members[0]?.user?.id } </p>
			</div>
		);
	};

	return (
		<div
			className={
				channel?.id === activeChannel?.id
					? "channel-preview__wrapper__selected"
					: "channel-preview__wrapper"
			}
			onClick={() => {
				setIsCreating(false);
				setIsEditing(false);

				setActiveChannel(channel);

				if (setToggleContainer) {
					setToggleContainer((prevState) => !prevState);
				}
			}}
		>
			{type === "team" ? <ChannelPreview /> : <DirectPreview />}{" "}
		</div>
	);
};

TeamChannelPreview.propTypes = {
	setActiveChannel: PropType.func,
	channel: PropType.object.isRequired,
	type: PropType.string.isRequired,
	setToggleContainer: PropType.func,
	setIsCreating: PropType.func.isRequired,
	setIsEditing: PropType.func.isRequired,
};
export default TeamChannelPreview;
