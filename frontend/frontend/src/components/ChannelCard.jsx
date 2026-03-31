import { useState } from "react";

const ChannelCard = ({ card }) => {
  return (
    <li>
      <div>
        <h3>{card.channelName}</h3>
        <p>
          <a href={card.youTubeUrl}>{card.youTubeUrl}</a>
        </p>
        <p>{card.description}</p>

        <div>
          <label>status: </label>
          <select value={card.status}>
            <option value="Subscribed">Subscribed</option>
            <option value="Watch Later">Watch Later</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        
      </div>
    </li>
  );
};

export default ChannelCard;
