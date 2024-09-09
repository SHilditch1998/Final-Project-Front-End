import React, { useState } from 'react';
import DeleteHabit from './DeleteHabit';

const ListHabits = ({ habits, onEdit, onComplete, onDelete }) => {
  const [selectedHabit, setSelectedHabit] = useState(null);

  const handleDelete = (habit) => {
    setSelectedHabit(habit); // Opens confirmation modal or similar UI for deletion
  };

  const confirmDelete = (habit) => {
    onDelete(habit); // Calls the actual delete function passed from parent
    setSelectedHabit(null); // Close confirmation modal
  };

  const cancelDelete = () => {
    setSelectedHabit(null); // Close confirmation modal without deleting
  };

  return (
    <div>
      <ul>
        {habits.map((habit) => (
          <li key={habit.HabitId}>
            {habit.title}
            <button onClick={() => onEdit(habit)}>Edit</button>
            <button onClick={() => onComplete(habit)}>
              {habit.completed ? 'Mark as To Do' : 'Mark as Done'}
            </button>
            <button onClick={() => handleDelete(habit)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Conditionally render the DeleteHabit component for confirmation */}
      {selectedHabit && (
        <DeleteHabit
          habit={selectedHabit}
          onDelete={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ListHabits;
