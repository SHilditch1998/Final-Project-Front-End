// src/components/Habits/DeleteHabit.jsx
import React from 'react';

const DeleteHabit = ({ habit, onDelete }) => {
  return (
    <div>
      <p>Are you sure you want to delete "{habit.title}"?</p>
      <button onClick={() => onDelete(habit)}>Delete</button>
    </div>
  );
};

export default DeleteHabit;
