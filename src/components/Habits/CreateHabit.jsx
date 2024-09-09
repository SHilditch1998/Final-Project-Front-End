// src/components/Habits/CreateHabit.jsx
import React, { useState } from 'react';

const CreateHabit = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('Add your description here'); // Set as color
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate({ title, color, completed });
      setTitle('');
      setColor('blue');
      setCompleted(false);
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
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default CreateHabit;
