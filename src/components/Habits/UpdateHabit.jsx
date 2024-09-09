// src/components/Habits/UpdateHabit.jsx
import React, { useState, useEffect } from 'react';

const UpdateHabit = ({ habit, onUpdate }) => {
  const [title, setTitle] = useState(habit.title);
  const [color, setColor] = useState(habit.color);
  const [completed, setCompleted] = useState(habit.completed);

  useEffect(() => {
    setTitle(habit.title);
    setColor(habit.color);
    setCompleted(habit.completed);
  }, [habit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onUpdate({ ...habit, title, color, completed });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Habit Title"
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Color"
      />
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>
      <button type="submit">Update Habit</button>
    </form>
  );
};

export default UpdateHabit;
