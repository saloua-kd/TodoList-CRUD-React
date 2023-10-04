import React, { useState } from "react";

const TodoItem = ({ item, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);
  const [isChecked, setIsChecked] = useState(false);


  const checkboxChange = () => {
    setIsChecked(!isChecked);
    onEdit(item.text, { ...item, completed: !isChecked  });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    console.log(editedText)
    setIsEditing(false);
    onEdit(editedText, { ...item, text: editedText });
  };

  return (
    <div>
      <input
        type="checkbox"
        className="checkbox"
        checked={isChecked}
        onChange={checkboxChange}
      />
      {isEditing ? (
        <input
          type="text"
          className="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="text"
          value={item.text}
          readOnly
          style={{
            textDecoration: isChecked ? "line-through" : "none",
          }}
        />
      )}

      {isEditing ? (
        <button onClick={handleSaveEdit}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}

      <button onClick={onDelete}>X</button>
    </div>
  );
};

export default TodoItem;
