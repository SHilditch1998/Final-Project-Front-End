import React, { useState, useReducer } from 'react';
import '../../App.css';
import '../../index.css';
import './DeleteHabit';
import './UpdateHabit';

const TaskListModal = ({ habits, setHabits, onEdit, onComplete, onDelete, isCreateModalOpen, setIsCreateModalOpen }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(habits.text);
  const [forceRender, setForceRender] = useState(false);

  const[,forceUpdate] =useReducer(x => x+1,0)

  const handleEditClick = (habit) => {
    setEditMode(habit.HabitId);
    setNewTitle(habit.title); // this is just the habit input
  };

  const handleSaveEdit = (habit, habitId) => {
    console.log(newTitle);
    
    onEdit(habitId, newTitle);
    setHabits(habits);
    console.log(habits);
    habit.title=newTitle;
    setEditMode(!editMode); 
    setIsCreateModalOpen(!isCreateModalOpen);
    forceUpdate;
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
          <div className="habitbutton-container">
            {/* Edit/Save Button */}
            {editMode === habit.HabitId ? (
              <button className="habitbutton" onClick={() => {handleSaveEdit(habit,habit.HabitId); setForceRender(!forceRender)}}>Save</button>
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