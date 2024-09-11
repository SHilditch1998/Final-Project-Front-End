import React from 'react';
import '../../App.css';
import '../../index.css';

const DeleteHabit = ({ habit, onDelete, onCancel }) => {
  const handleDelete = async () => {
    onDelete(habit);

    // Send delete request to Pixela (if needed)
    await updateGraph('delete', habit);
  };

  const updateGraph = async (action, habit) => {
    const token = "tokensecret";
    const graphUser = "graphuser";
    const graphID = 'your-graph-id';

    // Example for updating graph when a habit is deleted
    await fetch(`https://pixe.la/v1/users/${graphUser}/graphs/${graphID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-USER-TOKEN": token,
      },
      body: JSON.stringify({
        date: new Date().toISOString().split('T')[0],
      }),
    });
  };

  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete "{habit.title}"?</p>
      <div>
        <button className="taskbutton" onClick={handleDelete}>Yes, Delete</button>
        <button className="taskbutton close" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteHabit;
