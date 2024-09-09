// src/components/Habits/ListHabits.jsx
import React from 'react';

const ListHabits = ({ habits, onEdit, onComplete }) => {
  return (
    <ul>
      {habits.map((habit) => (
        <li key={habit.HabitId}>
          {habit.title}
          <button onClick={() => onEdit(habit)}>Edit</button>
          <button onClick={() => onComplete(habit)}>
            {habit.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListHabits;
