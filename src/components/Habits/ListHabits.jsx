import React, { useState } from 'react';
import DeleteHabit from './DeleteHabit';

const ListHabits = ({ habits, onEdit, onComplete, onDelete }) => {
  const [selectedHabit, setSelectedHabit] = useState(null);

  const handleDelete = (habit) => {
    setSelectedHabit(habit); // Opens the confirmation modal
  };

  const confirmDelete = (habit) => {
    if (onDelete) {
      onDelete(habit); // Pass the habit to delete up the chain
    }
    setSelectedHabit(null); // Close modal
  };

  const cancelDelete = () => {
    setSelectedHabit(null); // Close modal without deleting
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
