import React, { useState } from 'react';

const CreateHabit = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('blue');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newHabit = { title, color, completed };
      onCreate(newHabit);

      // Send task creation to Pixela (if needed)
      await updateGraph('create', newHabit);
      setTitle('');
      setColor('blue');
      setCompleted(false);
    }
  };

  const updateGraph = async (action, habit) => {
    const token = "tokensecret";
    const graphUser = "graphuser"; // Adjust as necessary
    const graphID = 'your-graph-id'; // This should be the user's graph ID

    // Example for updating graph when a habit is created
    await fetch(`https://pixe.la/v1/users/${graphUser}/graphs/${graphID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-USER-TOKEN": token,
      },
      body: JSON.stringify({
        date: new Date().toISOString().split('T')[0], // Date in YYYYMMDD format
        quantity: 1,
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
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default CreateHabit;
