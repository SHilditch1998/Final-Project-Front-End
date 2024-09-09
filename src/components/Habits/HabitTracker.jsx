import React, { useState, useEffect } from 'react';
import CreateHabit from './CreateHabit';
import UpdateHabit from './UpdateHabit';
import DeleteHabit from './DeleteHabit';
import ListHabits from './ListHabits';
import HabitModal from './HabitModal';

const HabitTracker = () => {
  const [graphData, setGraphData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState('');
  const [updateCount, setUpdateCount] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [allHabits, setAllHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const username = 'graphuser';
  const graphID = 'graph0001';
  const token = 'tokensecret';

  // Fetch Graph Data
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await fetch(`https://pixe.la/v1/users/${username}/graphs/${graphID}?mode=short&appearance=light`, {
          headers: {
            'X-USER-TOKEN': token
          }
        });

        if (!response.ok) {
          throw new Error("Error fetching graph data");
        }
        
        const data = await response.text();
        setGraphData(data);
        setErrorMsg("");
      } catch (error) {
        console.error(error.message);
        setErrorMsg("Graph Data Currently Unavailable");
      }
    };

    fetchGraphData();
  }, [updateCount]);

  // Fetch All Habits
  useEffect(() => {
    const fetchAllHabits = async () => {
      try {
        const response = await fetch("http://localhost:5003/Habits/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching habits");
        }

        const data = await response.json();
        setAllHabits(data.AllHabits);
      } catch (error) {
        console.error(error.message);
        setErrorMsg("Error fetching habits");
      }
    };

    fetchAllHabits();
  }, [updateCount]);

  // Handle Create Habit
  const handleCreate = async (habit) => {
    try {
      const response = await fetch("http://localhost:5003/Habits/Add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(habit),
      });

      if (response.ok) {
        const data = await response.json();
        setAllHabits([...allHabits, data]);
        setIsCreateModalOpen(false);
        setResponseMsg('Habit added successfully');
        setUpdateCount(updateCount + 1);
      } else {
        const data = await response.json();
        setResponseMsg(data.error || 'Failed to add habit');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMsg('Error adding habit');
    }
  };

  // Handle Update Habit
  const handleUpdate = async (habit) => {
    try {
      const response = await fetch("http://localhost:5003/Habit/edit", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(habit),
      });

      if (response.ok) {
        setAllHabits(allHabits.map(h => (h.HabitId === habit.HabitId ? habit : h)));
        setIsUpdateModalOpen(false);
        setSelectedHabit(null);
        setResponseMsg('Habit updated successfully');
        setUpdateCount(updateCount + 1);
      } else {
        const data = await response.json();
        setResponseMsg(data.message || 'Failed to update habit');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMsg('Error updating habit');
    }
  };

  // Handle Delete Habit
  const handleDelete = async (habit) => {
    try {
      const response = await fetch("http://localhost:5003/Habit/remove", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          HabitId: habit.HabitId,
          title: habit.title,
        }),
      });

      if (response.ok) {
        setAllHabits(allHabits.filter(h => h.HabitId !== habit.HabitId));
        setIsDeleteModalOpen(false);
        setSelectedHabit(null);
        setResponseMsg('Habit deleted successfully');
        setUpdateCount(updateCount + 1);
      } else {
        const data = await response.json();
        setResponseMsg(data.message || 'Failed to delete habit');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMsg('Error deleting habit');
    }
  };

  // Handle Complete Habit
  const handleComplete = async (habit) => {
    try {
      const response = await fetch("http://localhost:5003/Habits/Complete", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: habit.title,
          completed: !habit.completed
        }),
      });

      if (response.ok) {
        setAllHabits(allHabits.map(h => (h.title === habit.title ? { ...h, completed: !h.completed } : h)));
        setResponseMsg('Habit status updated');
        setUpdateCount(updateCount + 1);
      } else {
        const data = await response.json();
        setResponseMsg(data.message || 'Failed to update habit status');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMsg('Error updating habit status');
    }
  };

  const responseMessageStyle = {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: 'green'
  };

  const errorMessageStyle = {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: 'red'
  };

  return (
    <div className="data-box light-box">
      <h3>Your Habits</h3>
      {errorMsg ? (
        <p style={errorMessageStyle}>{errorMsg}</p>
      ) : (
        graphData ? (
          <div>
            <img src={`data:image/svg+xml;base64,${btoa(graphData)}`} alt="Habit Tracker Graph" />
          </div>
        ) : (
          <p>No Graph Data Available</p>
        )
      )}

      <div className="tasks">
        <h4>Add New Habit</h4>
        <button onClick={() => setIsCreateModalOpen(true)}>Open Create Habit Modal</button>
      </div>

      <ListHabits
        habits={allHabits}
        onEdit={(habit) => {
          setSelectedHabit(habit);
          setIsUpdateModalOpen(true);
        }}
        onComplete={(habit) => handleComplete(habit)}
      />

      {isCreateModalOpen && (
        <HabitModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreate}
        />
      )}

      {isUpdateModalOpen && selectedHabit && (
        <UpdateHabit
          habit={selectedHabit}
          onUpdate={handleUpdate}
        />
      )}

      {isDeleteModalOpen && selectedHabit && (
        <DeleteHabit
          habit={selectedHabit}
          onDelete={() => handleDelete(selectedHabit)}
        />
      )}

      {responseMsg && (
        <p style={responseMessageStyle}>{responseMsg}</p>
      )}
    </div>
  );
};

export default HabitTracker;
