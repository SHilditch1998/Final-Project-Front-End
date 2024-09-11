import React, { useState, useReducer } from 'react';
import '../../App.css';
import '../../index.css';
import DeleteHabit from './DeleteHabit';
import readcookie from '../../utils/readcookie';

const TaskListModal = ({ habits, setHabits, onEdit, onComplete, graphID  }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [forceRender, setForceRender] = useState(false);
  
  // State for Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const handleEditClick = (habit) => {
    setEditMode(habit.HabitId);
    setNewTitle(habit.title); // this is just the habit input
  };

  const handleSaveEdit = (habit, habitId) => {
    onEdit(habitId, newTitle);  // Call the parent-provided onEdit function
    habit.title = newTitle;  // Update the local habit title
    setEditMode(false);  // Exit edit mode
    setForceRender(!forceRender);  // Force re-render
  };

  const handleDeleteClick = (habit) => {
    setSelectedHabit(habit);  // Set the selected habit for deletion
    setIsDeleteModalOpen(true);  // Open the delete modal
  };

  const handleDeleteHabit = async (habit) => {
    const habitId = habit.HabitId;
    const jwtToken = readcookie("jwt_token");

    if (!jwtToken) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5003/Habit/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          HabitId: habitId,
          title: habit.title
        }),
      });

      if (response.ok) {
        setHabits(prevHabits => prevHabits.filter(h => h.HabitId !== habitId));  // Remove the habit from the state
        console.log(`Habit ${habitId} successfully deleted.`);
        setIsDeleteModalOpen(false);  // Close the modal

      } else {
        console.error(`Failed to delete habit ${habitId}`);
      }
    } catch (error) {
      console.error("Error occurred while deleting habit:", error);
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
          <button className="habitbutton" onClick={() => handleSaveEdit(habit, habit.HabitId)}>Save</button>
        ) : (
          <button className="habitbutton" onClick={() => handleEditClick(habit)}>Edit</button>
        )}

        {/* Complete Button */}
        <button className="habitbutton" onClick={() => onComplete(habit)}>
          {habit.completed ? 'Undo' : 'Complete'}
        </button>

        {/* Delete Button */}
        <button className="habitbutton" onClick={() => handleDeleteClick(habit)}>Delete</button>
      </div>
    </li>
  ))}
</ul>


      {isDeleteModalOpen && selectedHabit && (
        <DeleteHabit
          habit={selectedHabit}
          onDelete={handleDeleteHabit}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskListModal;
