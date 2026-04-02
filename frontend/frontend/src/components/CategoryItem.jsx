import { useState } from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category, onDelete, onUpdate }) => {
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
    <li>
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
          <p>{category.description || " "}</p>

          <button onClick={() => setIsEditing(true)}>Edit Text</button>
          <button onClick={() => onDelete(category._id)}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default CategoryItem;
