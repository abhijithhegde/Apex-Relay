import { Channel, useChatContext, MessageSimple } from "stream-chat-react";
import PropTypes from "prop-types";

import { ChannelInner, CreateChannel, EditChannel } from "./";

const ChannelContainer = ({
	isCreating,
	setIsCreating,
	isEditing,
	setIsEditing,
	createType,
}) => {
	const { channel } = useChatContext();

	if (isCreating) {
		return (
			<div className="channel__container">
				<CreateChannel
					createType={createType}
					setIsCreating={setIsCreating}
				/>
			</div>
		);
	}

	if (isEditing) {
		return (
			<div className="channel__container">
				<EditChannel setIsEditing={setIsEditing} />
			</div>
		);
	}

	const EmptyState = () => (
		<div className="channel-empty__container">
			<p className="channel-empty__first">
				This is the start of your chat
			</p>
			<p className="channel-empty__second">
				Send messages, attachments, and more!
			</p>
		</div>
	);

	return (
		<div className="channel__container">
			<Channel
				EmptyStateIndicator={EmptyState}
				Message={(messageProps, i) => (
					<MessageSimple key={i} {...messageProps} />
				)}
			>
				<ChannelInner setIsEditing={setIsEditing} />
			</Channel>
		</div>
	);
};

ChannelContainer.propTypes = {
	isCreating: PropTypes.bool,
	setIsCreating: PropTypes.func,
	isEditing: PropTypes.bool,
	setIsEditing: PropTypes.func,
	createType: PropTypes.string,
};

export default ChannelContainer;
