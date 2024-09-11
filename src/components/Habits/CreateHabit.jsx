import React, { useState } from 'react';
import readcookie from '../../utils/readcookie';

const CreateHabit = ({ onClose, onHabitCreated, graphID }) => {
  const [habitTitle, setHabitTitle] = useState('');
  const [error, setError] = useState(null);

  const pixelaUser = 'graphuser';  // Fixed Pixe.la user
  const token = 'tokensecret';  // Pixe.la API token

  const handleCreateHabit = async () => {
    const jwtToken = readcookie("jwt_token");
    if (!jwtToken) {
      setError("You must be logged in to create a habit.");
      return;
    }

    const newHabit = {
      title: habitTitle
    };

    try {
      // Add the habit to your backend
      const response = await fetch('http://localhost:5003/Habit/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(newHabit),
      });

      if (response.ok) {
        const createdHabit = await response.json();
        // Update the habit list in the parent component
        onHabitCreated(prevHabits => [...prevHabits, createdHabit]);

        // Add the habit to Pixe.la graph
        await addHabitToPixela();
        onClose();  // Close the modal after success
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create habit.");
      }
    } catch (error) {
      setError("Error occurred while creating habit.");
    }
  };

  // Function to add a habit to the Pixe.la graph
  console.log(graphID);
  
  const addHabitToPixela = async () => {
    const date = new Date().toISOString().split('T')[0];  // YYYYMMDD format
    const response = await fetch(`https://pixe.la/v1/users/${pixelaUser}/graphs/${graphID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-USER-TOKEN': token,
      },
      body: JSON.stringify({
        date: date.replace(/-/g, ""),  // Pixe.la requires date in YYYYMMDD format
        quantity: '1',  // For now, 1 pixel for each task
      }),
    });

    if (!response.ok) {
      console.error('Failed to update Pixe.la graph');
    }
  };

  return (
    <div className="create-habit-modal">
      <h2>Create a New Habit</h2>
      {error && <p className="error-message">{error}</p>}
      
      <input
        className="task-input"
        type="text"
        placeholder="Habit"
        value={habitTitle}
        onChange={(e) => setHabitTitle(e.target.value)}
      />
      
      <button className="taskbutton" onClick={handleCreateHabit}>
        Create Habit
      </button>
    </div>
  );
};

export default CreateHabit;
