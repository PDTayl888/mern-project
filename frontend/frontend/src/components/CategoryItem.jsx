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
          <input type="text" value={editName} onChange={handleEditName} />
          <input type="text" value={editDesc} onChange={handleEditDesc} />
          <button onClick={handleSave}>save</button>
          <button onClick={handleCancel}>cancel</button>
        </div>
      ) : (
        <div>
          <Link to={`/categories/${category._id}`}>
            <h3>{category.name}</h3>
          </Link>
          <p style={descStyle}>{category?.description || "NO DESCRIPTION AVAILABLE "}</p>

          <button onClick={() => setIsEditing(true)}>Edit Text</button>
          <button onClick={() => onDelete(category._id)}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default CategoryItem;
