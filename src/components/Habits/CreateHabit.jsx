import React, { useState } from 'react';
import readcookie from '../../utils/readcookie';

const CreateHabit = ({ onClose, onHabitCreated, graphID }) => {
  const [habitTitle, setHabitTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);  // Default to today's date
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

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
      const response = await fetch('https://final-project-back-end-production.up.railway.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(newHabit),
      });

      if (response.ok) {
        // Call the addHabitToPixela function after creating the habit
        addHabitToPixela(selectedDate);  // Make sure `selectedDate` is being passed correctly
        const createdHabit = await response.json();  // Get the created habit from the response
        onHabitCreated(prevHabits => [...prevHabits, createdHabit]);  // Update the state with the new habit
        onClose();  // Close the modal after success;
      }
    } catch (error) {
      setError("Error occurred while creating habit.");
    }
  };

  const addHabitToPixela = async (selectedDate) => {
    const formattedDate = selectedDate.replace(/-/g, "");  // Format date to YYYYMMDD
    const token = 'tokensecret';  // Pixe.la API token
    const pixelaUser = 'graphuser';  // Fixed Pixe.la user

  try {
    const response = await fetch(`https://pixe.la/v1/users/${pixelaUser}/graphs/${graphID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-USER-TOKEN': token,
      },
      body: JSON.stringify({
        date: formattedDate,  // Send the selected date
        quantity: '1',  // One pixel per habit
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to update Pixe.la graph:', responseData);
    } else {
      console.log('Successfully added pixel to Pixe.la');
    }
  } catch (error) {
    console.error('Error adding pixel to Pixe.la:', error);
  }
};

  return (
    <div className="create-habit-modal">
      <h2>Create a New Habit</h2>
      {error && <p className="error-message">{error}</p>}
      
      <input
        className="task-input"
        type="text"
        placeholder="Habit Title"
        value={habitTitle}
        onChange={(e) => setHabitTitle(e.target.value)}
      />
      {/* Date Picker for Task Creation */}
      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      
      <button className="taskbutton" onClick={handleCreateHabit}>
        Create Habit
      </button>
    </div>
  );
};

export default CreateHabit;
