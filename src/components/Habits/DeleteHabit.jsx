import React from 'react';

const DeleteHabit = ({ habit, onDelete, onCancel }) => {
  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete "{habit.title}"? You might dissapoint the duck.</p>
      <button onClick={() => onDelete(habit)}>Yes, Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DeleteHabit;
