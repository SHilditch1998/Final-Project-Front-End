import React from 'react';
import ListHabits from './ListHabits';

const TaskListModal = ({ isOpen, onClose, habits, onEdit, onComplete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Task List</h2>
        <ListHabits
          habits={habits}
          onEdit={onEdit}
          onComplete={onComplete}
        />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskListModal;
