import React from 'react';
import '../../App.css';
import '../../index.css';
import "../../utils/readcookie";
import "../../utils/eraseCookie";

const DeleteHabit = ({ habit, onDelete, onCancel, graphID }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const handleDelete = async () => {
    await onDelete(habit);  
    // Then try deleting the pixel from Pixe.la
    await deleteHabitFromPixela(date);
  };

  const deleteHabitFromPixela = async (selectedDate) => {
    const formattedDate = selectedDate.replace(/-/g, "");  // Format date to YYYYMMDD
    const token = 'tokensecret';  // Pixe.la API token
    const pixelaUser = 'graphuser';  // Fixed Pixe.la user

    if (!graphID) {
      console.error('Failed to delete pixel from Pixe.la: graphID is undefined');
      return;
    }

    // Request to delete the pixel
    const response = await fetch(`https://pixe.la/v1/users/${pixelaUser}/graphs/${graphID}/${formattedDate}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-USER-TOKEN': token,
      },
    });

    if (!response.ok) {
      console.error('Failed to delete pixel from Pixe.la');
    }
  };

  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete "{habit.title}"?</p>

      {/* Date Picker for Task Deletion */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div>
        <button className="taskbutton" onClick={handleDelete}>Yes, Delete</button>
        <button className="taskbutton close" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteHabit;