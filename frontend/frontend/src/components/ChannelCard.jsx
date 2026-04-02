import { useState } from "react";

const ChannelCard = ({ card, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    channelName: card.channelName,
    youTubeUrl: card.youTubeUrl,
    description: card.description,
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(card._id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      channelName: card.channelName,
      youTubeUrl: card.youTubeUrl,
      description: card.description,
    });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="channelName"
            value={editData.channelName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="youTubeUrl"
            value={editData.youTubeUrl}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="description"
            name="description"
            value={editData.description}
            onChange={handleChange}
          />

          <button onClick={handleSave}>save changes</button>
          <button onClick={handleCancel}>cancel</button>
        </div>
      ) : (
        <div>
          <h3>{card.channelName}</h3>

          {card.youTubeUrl ? (
            <p>
              <a href={card.youTubeUrl} target="_blank" rel="noreferrer">
                {card.youTubeUrl}
              </a>
            </p>
          ) : (
            <p>No URL saved.</p>
          )}
          <div>{card.description}</div>

          <div>
            <label>status: </label>
            <select value={card.status}>
              <option value="Subscribed">Subscribed</option>
              <option value="Watch Later">Watch Later</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit Text</button>
          <button onClick={() => onDelete(card._id)}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default ChannelCard;
