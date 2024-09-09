import { useState, useEffect } from 'react';
import HabitModal from './HabitModal';

const HabitTracker = () => {
  const [graphData, setGraphData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState('');
  const [updateCount, setUpdateCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState('');
  const [modalQuantity, setModalQuantity] = useState('');
  const [allHabits, setAllHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const username = 'graphuser';
  const graphID = 'graph0001';
  const token = 'tokensecret';

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

    const fetchAllHabits = async () => {
      try {
        const response = await fetch("http://localhost:5003/Habits/List", {
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

    fetchGraphData();
    fetchAllHabits();
  }, [username, graphID, updateCount]);

  const handleAddOrUpdateTask = async (date, quantity) => {
    try {
      // Format the date for API request
      const formattedDate = date.replace(/-/g, '');
      const response = await fetch("http://localhost:5003/Habits/Create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formattedDate,
          color: 'blue', // You might need to adjust this based on your requirements
          completed: false, // Initial value for new habits
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMsg('Task added successfully');
        setUpdateCount(updateCount + 1);
        setIsModalOpen(false);
      } else {
        const data = await response.json();
        setResponseMsg(data.error || 'Failed to add task');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMsg('Error adding task');
    }
  };

  const handleCompleteTask = async (title) => {
    try {
      const response = await fetch("http://localhost:5003/Habits/Complete", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          completed: true
        }),
      });

      if (response.ok) {
        setResponseMsg('Task marked as completed');
        setUpdateCount(updateCount + 1);
      } else {
        const data = await response.json();
        setResponseMsg(data.message || 'Failed to complete task');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMsg('Error completing task');
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch("http://localhost:5003/Habits/Delete", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          HabitId: selectedHabit.HabitId,
          title: selectedHabit.title
        }),
      });

      if (response.ok) {
        setResponseMsg('Task deleted successfully');
        setUpdateCount(updateCount + 1);
      } else {
        const data = await response.json();
        setResponseMsg(data.message || 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMsg('Error deleting task');
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
        <h4>Add/Update Task</h4>
        <button className="taskbutton" onClick={() => setIsModalOpen(true)}>Open Modal</button>
      </div>

      <div>
        <h4>Delete Task</h4>
        <input
          className="task-input"
          type="date"
          value={modalDate}
          onChange={(e) => setModalDate(e.target.value)}
          placeholder="Enter Date (yyyy-MM-dd)"
        />
        <button className="taskbutton" onClick={handleDeleteTask}>Delete Task</button>
      </div>

      {responseMsg && (
        <p style={responseMessageStyle}>{responseMsg}</p>
      )}

      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(date, quantity) => {
          handleAddOrUpdateTask(date, quantity);
          setModalDate(date);
          setModalQuantity(quantity);
        }}
      />
    </div>
  );
};

export default HabitTracker;
