import React from 'react';
import '../../App.css';
import '../../index.css';
import "../../utils/readcookie";
import "../../utils/eraseCookie";

const DeleteHabit = ({ habit, onDelete, onCancel }) => {
  // Handle the delete logic
  const handleDelete = async () => {
    await onDelete(habit);  // Ensure the habit is deleted after confirmation
  };

  return (
    <div className="delete-confirmation">
      <p>
        Are you sure you want to delete "{habit.title}"? <br></br><br></br>
        <span className="bold-text"> Just know that this task will stay on your graph as a reminder.</span>
      </p>
      <div>
        <button className="taskbutton" onClick={handleDelete}>Yes, Delete</button>
        <button className="taskbutton close" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteHabit;
