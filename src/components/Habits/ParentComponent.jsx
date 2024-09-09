import React, { useState } from 'react';
import TaskListModal from './TaskListModal';

const ParentComponent = () => {
  const [habits, setHabits] = useState([
    { HabitId: 1, title: 'Exercise', completed: false },
    { HabitId: 2, title: 'Meditation', completed: false },
  ]);

  const handleDelete = (habitToDelete) => {
    setHabits(habits.filter((habit) => habit.HabitId !== habitToDelete.HabitId));
  };

  const handleEdit = (habitToEdit) => {
    // Edit logic here
  };

  const handleComplete = (habitToComplete) => {
    // Complete logic here
  };

  return (
    <div>
      <TaskListModal
        habits={habits}
        onEdit={handleEdit}
        onComplete={handleComplete}
        onDelete={handleDelete} // Make sure this is passed
      />
    </div>
  );
};

export default ParentComponent;
