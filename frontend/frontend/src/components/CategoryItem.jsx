import { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryItem = () => {
    const [isEditing, setIsEditing] = useState(false);
    return (
 <li>
      {isEditing ? (
        <div>
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
            onChange={handleChange}
          />
          <button onClick={handleSave}>save changes</button>
          <button onClick={handleCancel}>cancel</button>
        </div>
      ) : (
        <div>
          <h3>{card.channelName}</h3>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit Text</button>
          <button onClick={() => onDelete(card._id)}>Remove</button>
        </div>
      )}
    </li>    );
};

export default CategoryItem;