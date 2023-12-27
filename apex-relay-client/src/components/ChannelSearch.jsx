import { useState, useEffect } from "react";
import PropsTypes from "prop-types";
import { useChatContext } from "stream-chat-react";

import { ResultsDropdown } from "./";
import { SearchIcon } from "../assets/SearchIcon.jsx";

const ChannelSearch = ({ setToggleContainer }) => {
	const { client, setActiveChannel } = useChatContext();
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [teamChannels, setTeamChannels] = useState([]);
	const [directMessages, setDirectMessages] = useState([]);

	useEffect(() => {
		if (!query) {
			setTeamChannels([]);
			setDirectMessages([]);
		}
	}, [query]);

	const getChannels = async (text) => {
		try {
			const channelResponse = client.queryChannels({
				type: "team",
				name: { $autocomplete: text },
				members: { $in: [client.userID] },
			});

			const userResponse = client.queryUsers({
				id: { $ne: client.userID },
				name: { $autocomplete: text },
			});

			const [channels, { users }] = await Promise.all([
				channelResponse,
				userResponse,
			]);

			if (channels.length) setTeamChannels(channels);
			if (users.length) setDirectMessages(users);
		} catch (error) {
			setQuery("");
		}
	};

	const onSearch = (event) => {
		event.preventDefault();
		setLoading(true);
		setQuery(event.target.value);
		getChannels(event.target.value);
	};

	const setChannel = (channel) => {
		setQuery("");
		setActiveChannel(channel);
	};

	return (
		<div className="channel-search__container">
			<div className="channel-search__input__wrapper">
				<div className="channel-search__input__icon">
					<SearchIcon />
				</div>
				<input
					className="channel-search__input__text"
					type="text"
					placeholder="Search"
					value={query}
					onChange={onSearch}
				/>
			</div>
			{query && (
				<ResultsDropdown
					teamChannels={teamChannels}
					directMessages={directMessages}
					loading={loading}
					setQuery={setQuery}
					setChannel={setChannel}
					setToggleContainer={setToggleContainer}
				/>
			)}
		</div>
	);
};

ChannelSearch.propTypes = {
	setToggleContainer: PropsTypes.func,
};

export default ChannelSearch;
