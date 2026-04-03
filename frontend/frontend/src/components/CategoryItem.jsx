import { useState } from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category, onDelete, onUpdate }) => {
  const descStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: 3,
    maxWidth: "40ch",
    margin: "0 auto",
    lineHeight: "1.4",
  };
  const buttonStyle = {
    backgroundColor: "#00e5ff",
    color: "#1a2a3a",
    border: "none",
    padding: "7px",
    margin: "1.5px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  };

  const inputStyle = {
    padding: "8px 10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "2px solid #00e5ff",
    backgroundColor: "#1a2a3a",
    color: "white",
    fontSize: "1.1rem",
  };

  const nameStyle = {
    color: "#1c456e",
    textAlign: "center",
    fontSize: "2.5rem",
    margin: "20px 0",
  };

  const categoryStyle = {
    backgroundColor: "#30cdcd",
    color: "#6e2fc5",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    borderRadius: "12px",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(category.name);
  const [editDesc, setEditDesc] = useState(category.description);

  const handleEditName = (e) => {
    setEditName(e.target.value);
  };

  const handleEditDesc = (e) => {
    setEditDesc(e.target.value);
  };

  const handleSave = () => {
    onUpdate(category._id, { name: editName, description: editDesc });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(category.name);
    setEditDesc(category.description);
    setIsEditing(false);
  };

  return (
    <li style={categoryStyle}>
      {isEditing ? (
        <div>
          <input
            style={inputStyle}
            placeholder="CATEGORY NAME"
            type="text"
            value={editName}
            onChange={handleEditName}
          />
          <input
            style={inputStyle}
            placeholder="DESCRIPTION"
            type="text"
            value={editDesc}
            onChange={handleEditDesc}
          />
          <button style={buttonStyle} onClick={handleSave}>
            save
          </button>
          <button style={buttonStyle} onClick={handleCancel}>
            cancel
          </button>
        </div>
      ) : (
        <div>
          <Link to={`/categories/${category._id}`}>
            <h3 style={nameStyle}>{category?.name?.toUpperCase()}</h3>
          </Link>
          <p style={descStyle}>
            {category?.description || "NO DESCRIPTION AVAILABLE "}
          </p>

          <button style={buttonStyle} onClick={() => setIsEditing(true)}>
            Edit Text
          </button>
          <button style={buttonStyle} onClick={() => onDelete(category._id)}>
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default CategoryItem;
