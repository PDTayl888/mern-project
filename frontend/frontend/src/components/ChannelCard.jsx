import { useState } from "react";

const ChannelCard = ({ card, onDelete, onUpdate }) => {
  const cardStyle = {
    backgroundColor: "#30cdcd",
    color: "#6e2fc5",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    borderRadius: "12px",
    padding: "15px",
  };

  const linkStyle = {
   color: "#1d0c36",
    fontWeight: "bold",
    textDecoration: "underline",
    wordBreak: "break-all",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    channelName: card.channelName,
    youTubeUrl: card.youTubeUrl,
    description: card.description,
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
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
    <div style={cardStyle}>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <input
            type="text"
            name="channelName"
            value={editData.channelName}
            onChange={handleChange}
          />
          <input
            type="url"
            name="youTubeUrl"
            value={editData.youTubeUrl}
            pattern=".*youtube\.com.*|.*youtu\.be.*"
            onChange={handleChange}
            title="Please enter valid URL"
          />
          <input
            type="text"
            placeholder="description"
            name="description"
            value={editData.description}
            onChange={handleChange}
          />

          <button type="submit">save changes</button>
          <button type="button" onClick={handleCancel}>cancel</button>
        </form>
      ) : (
        <div>
          <h3>{card.channelName}</h3>

          {card.youTubeUrl ? (
            <p>
              <a 
              href={card.youTubeUrl} 
              target="_blank" 
              rel="noreferrer"
              style={linkStyle}>
                {card.youTubeUrl}
              </a>
            </p>
          ) : (
            <p>No URL saved.</p>
          )}
          <div>{card.description}</div>

          <div>
            <label>status: </label>
            <select
              value={card.status}
              onChange={(e) => onUpdate(card._id, { status: e.target.value })}
            >
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
