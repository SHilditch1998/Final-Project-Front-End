import React, { useState } from 'react';

const HabitModal = ({ isOpen, onClose, onSave }) => {
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSave = () => {
    onSave(date, quantity);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Add/Update Task</h4>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter Date (yyyy-MM-dd)"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter Quantity"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default HabitModal;
