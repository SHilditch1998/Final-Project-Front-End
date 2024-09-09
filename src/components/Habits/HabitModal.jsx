import React, { useState } from 'react';
import CreateHabit from './CreateHabit';

const HabitModal = ({ isOpen, onClose, onSave }) => {
  const [habitData, setHabitData] = useState({ title: '', color: 'blue', completed: false });

  const handleSave = () => {
    onSave(habitData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Habit</h2>
        <CreateHabit onCreate={(data) => {
          setHabitData(data);
          handleSave();
        }} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HabitModal;
