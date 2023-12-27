import PropTypes from "prop-types";

import { AddChannel } from "../assets/AddChannel.jsx";

const TeamChannelList = ({
	children,
	error = false,
	loading,
	type,
	isCreating,
	setIsCreating,
	setIsEditing,
	setCreateType,
	setToggleContainer
}) => {
	if (error) {
		return type === "team" ? (
			<div className="team-channel-list">
				<p className="team-channel-list__message">
					Connection Error. Please try again later
				</p>
			</div>
		) : null;
	}

	if (loading) {
		return type === "team" ? (
			<div className="team-channel-list">
				<p className="team-channel-list__message loading">
					{type === "team" ? "Channels" : "Messages"} Loading....
				</p>
			</div>
		) : null;
	}

	return (
		<div className="team-channel-list">
			<div className="team-channel-list__header">
				<p className="team-channel-list__header__title">
					{type === "team" ? "Channels" : "Direct Messages"}
				</p>
				<AddChannel
					isCreating={isCreating}
					setIsCreating={setIsCreating}
					setIsEditing={setIsEditing}
					setCreateType={setCreateType}
					type={type === "team" ? "team" : "messaging"}
					setToggleContainer={setToggleContainer}
				/>
			</div>
			{children}
		</div>
	);
};

TeamChannelList.propTypes = {
	children: PropTypes.node.isRequired,
	error: PropTypes.object,
	loading: PropTypes.bool,
	type: PropTypes.string,
	isCreating: PropTypes.bool,
	setIsCreating: PropTypes.func,
	setIsEditing: PropTypes.func,
	setCreateType: PropTypes.func,
	setToggleContainer: PropTypes.func
};

export default TeamChannelList;
