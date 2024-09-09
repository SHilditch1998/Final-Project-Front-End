import React, { useState } from 'react';
import TaskListModal from './TaskListModal';
import '../user/userprofile'
import './HabitModal'
import './ListHabits'
import './ParentComponent'
import './TaskListModal'
import './UpdateHabit'

const HabitTracker = ({ onDelete }) => {
  const [habits, setHabits] = useState([
    { HabitId: 1, title: 'Exercise', completed: false },
    { HabitId: 2, title: 'Meditation', completed: false },
  ]);

  const handleEdit = (habit) => {
    // Edit logic here
  };

  const handleComplete = (habit) => {
    // Complete logic here
  };

  return (
    <div>
      {/* Add some text to see if the component is rendering */}
      <h2>Habit Tracker</h2>
      <TaskListModal
        habits={habits}
        onEdit={handleEdit}
        onComplete={handleComplete}
        onDelete={onDelete}
      />
    </div>
  );
};

export default HabitTracker;
