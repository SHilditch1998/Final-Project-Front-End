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


  const handleCompleteHabit = async (habitId) => {
    if (!jwtToken) {
      console.error("User not authenticated");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5003/Habit/completed/${habitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
  
      if (response.ok) {
        onHabitCompleted(habitId); // Notify parent of the completion
        console.log(`Habit ${habitId} successfully completed.`);
      } else {
        console.error(`Failed to complete habit ${habitId}`);
      }
    } catch (error) {
      console.error("Error occurred while completing habit:", error);
    }
  };


  return (
    <div>
      <ul className="listoftasks">
        {habits.map((habit) => (
          <li key={habit.HabitId}>
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
          <div class="habitbutton-container">
            {/* Edit/Save Button */}
            {editMode === habit.HabitId ? (
              <button className="habitbutton" onClick={() => handleSaveEdit(habit.HabitId)}>Save</button>
            ) : (
              <button className="habitbutton" onClick={() => handleEditClick(habit)}>Edit</button>
            )}

            {/* Complete Button */}
            <button className="habitbutton" onClick={() => onComplete(habit.HabitId)}>
              {habit.completed ? 'Undo' : 'Complete'}
            </button>
            {/* Change to toggle box */}

            {/* Delete Button */}
            <button className="habitbutton" onClick={() => onDelete(habit.HabitId)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>

    
  );
};

export default TaskListModal;