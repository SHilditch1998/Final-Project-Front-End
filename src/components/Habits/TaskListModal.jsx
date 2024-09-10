import React, { useState } from 'react';

const TaskListModal = ({ habits, onEdit, onComplete, onDelete }) => {
  const [editMode, setEditMode] = useState(null); // Track the habit being edited
  const [newTitle, setNewTitle] = useState('');

  const handleEditClick = (habit) => {
    setEditMode(habit.HabitId);
    setNewTitle(habit.title); // Pre-fill input with existing title
  };

  const handleSaveEdit = (habitId) => {
    onEdit(habitId, newTitle);
    setEditMode(null); // Exit edit mode after saving
  };

  return (
    <div>
      <ul>
        {habits.map((habit) => (
          <li key={habit.HabitId}>
            {/* If in edit mode, show an input to edit the habit */}
            {editMode === habit.HabitId ? (
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            ) : (
              <span style={{ textDecoration: habit.completed ? 'line-through' : 'none' }}>
                {habit.title}
              </span>
            )}

            {/* Edit/Save Button */}
            {editMode === habit.HabitId ? (
              <button onClick={() => handleSaveEdit(habit.HabitId)}>Save</button>
            ) : (
              <button onClick={() => handleEditClick(habit)}>Edit</button>
            )}

            {/* Complete Button */}
            <button onClick={() => onComplete(habit.HabitId)}>
              {habit.completed ? 'Undo' : 'Complete'}
            </button>

            {/* Delete Button */}
            <button onClick={() => onDelete(habit.HabitId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListModal;