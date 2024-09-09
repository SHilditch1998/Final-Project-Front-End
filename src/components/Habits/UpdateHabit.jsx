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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      const updatedHabit = { ...habit, title, color, completed };
      onUpdate(updatedHabit);

      // Send update to Pixela
      await updateGraph('update', updatedHabit);
    }
  };

  const updateGraph = async (action, habit) => {
    const token = "tokensecret";
    const graphUser = "graphuser";
    const graphID = 'your-graph-id';

    // Example for updating graph when a habit is updated
    await fetch(`https://pixe.la/v1/users/${graphUser}/graphs/${graphID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-USER-TOKEN": token,
      },
      body: JSON.stringify({
        date: new Date().toISOString().split('T')[0],
        quantity: habit.completed ? 1 : 0,
      }),
    });
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
