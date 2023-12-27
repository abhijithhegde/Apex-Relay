import { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import PropsTypes from "prop-types";
import Cookies from "universal-cookie";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import ApexRelayIcon from "../assets/send.png";
import LogoutIcon from "../assets/logout.png";

const SideBar = ({ logout }) => (
	<div className="channel-list__sidebar">
		<div className="channel-list__sidebar__icon1">
			<div className="icon1__inner">
				<img src={ApexRelayIcon} alt="Apex Relay" width="42" />
			</div>
		</div>
		<div className="channel-list__sidebar__icon2">
			<div className="icon1__inner">
				<img
					src={LogoutIcon}
					alt="Logout"
					width="30"
					onClick={logout}
				/>
			</div>
		</div>
	</div>
);

const GroupHeader = () => (
	<div className="channel-list__header">
		<p className="channel-list__header__text">Apex Relay</p>
	</div>
);

const TeamFilter = (channels) => {
	return channels.filter((channel) => channel.type === "team");
};

const directMessageFilter = (channels) => {
	return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({
	isCreating,
	setIsCreating,
	setIsEditing,
	setCreateType,
	setToggleContainer,
}) => {
	const { client } = useChatContext();
	const logout = () => {
		const cookies = new Cookies();

		cookies.remove("token");
		cookies.remove("userId");
		cookies.remove("username");
		cookies.remove("fullName");
		cookies.remove("avatarURL");
		cookies.remove("hashedPassword");
		cookies.remove("phoneNo");

		window.location.reload();
	};

	const filters = { members: { $in: [client.userID] } };

	return (
		<>
			<SideBar logout={logout} />
			<div className="channel-list__list__wrapper">
				<GroupHeader />
				<ChannelSearch setToggleContainer={setToggleContainer} />
				<ChannelList
					filters={filters}
					channelRenderFilterFn={TeamFilter}
					List={(listprops) => (
						<TeamChannelList
							{...listprops}
							type="team"
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setCreateType={setCreateType}
							setToggleContainer={setToggleContainer}
						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview
							{...previewProps}
							type="team"
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setCreateType={setCreateType}
							setToggleContainer={setToggleContainer}
						/>
					)}
				/>
				<ChannelList
					filters={filters}
					channelRenderFilterFn={directMessageFilter}
					List={(listprops) => (
						<TeamChannelList
							{...listprops}
							type="messaging"
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setCreateType={setCreateType}
							setToggleContainer={setToggleContainer}
						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview
							{...previewProps}
							type="messaging"
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setCreateType={setCreateType}
							setToggleContainer={setToggleContainer}
						/>
					)}
				/>
			</div>
		</>
	);
};

const ChannelListContainer = ({
	setCreateType,
	setIsCreating,
	setIsEditing,
}) => {
	const [toggleContainer, setToggleContainer] = useState(false);

	return (
		<>
			<div className="channel-list__container">
				<ChannelListContent
					setCreateType={setCreateType}
					setIsCreating={setIsCreating}
					setIsEditing={setIsEditing}
				/>
			</div>
			<div
				className="channel-list__container-responsive"
				style={{
					left: toggleContainer ? "0%" : "-89%",
					backgroundColor: "#005ffff",
				}}
			>
				<div
					className="channel-list__container-toggle"
					onClick={() =>
						setToggleContainer(
							(prevToggleContainer) => !prevToggleContainer
						)
					}
				>
					<ChannelListContent
						setCreateType={setCreateType}
						setIsCreating={setIsCreating}
						setIsEditing={setIsEditing}
						setToggleContainer={setToggleContainer}
					/>
				</div>
			</div>
		</>
	);
};

ChannelListContainer.propTypes = {
	setCreateType: PropsTypes.func,
	setIsCreating: PropsTypes.func,
	setIsEditing: PropsTypes.func,
};

ChannelListContent.propTypes = {
	isCreating: PropsTypes.bool,
	setIsCreating: PropsTypes.func,
	setIsEditing: PropsTypes.func,
	setCreateType: PropsTypes.func,
	setToggleContainer: PropsTypes.func,
};

SideBar.propTypes = {
	logout: PropsTypes.func.isRequired,
};

export default ChannelListContainer;
