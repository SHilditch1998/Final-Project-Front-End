import React, { useState, useEffect } from 'react';
import CreateHabit from './CreateHabit';  // Modal for creating a new task (habit)
import '../../App.css';
import '../../index.css';
import readcookie from '../../utils/readcookie';

const HabitTracker = ({ username }) => {
  const [habits, setHabits] = useState([]);
  const [graphData, setGraphData] = useState(null);  // State for storing the graph
  const [errorMsg, setErrorMsg] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Modal state

  const pixelaUser = 'graphuser';  // The Pixe.la user (always 'graphuser')
  const graphID = username;  // Use username as the graph ID
  console.log(username);
  
  const token = 'tokensecret';  // Pixe.la user token (use the actual token)

  // Fetch habits from backend and graph from Pixe.la
  useEffect(() => {
    const fetchHabitsAndGraph = async () => {
      const jwtToken = readcookie("jwt_token");
      if (!jwtToken) {
        console.error("User not authenticated");
        return;
      }

      try {
        // Fetch habits from your backend
        const habitResponse = await fetch('http://localhost:5003/Habits/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
          },
        });

        if (habitResponse.ok) {
          const data = await habitResponse.json();
          setHabits(data.AllHabits); // Assuming response structure from backend
        } else {
          console.error('Error fetching habits from backend');
        }

        // Fetch graph data from Pixe.la
        const graphResponse = await fetch(`https://pixe.la/v1/users/${pixelaUser}/graphs/${graphID}?mode=short&appearance=light`, {
          headers: {
            'X-USER-TOKEN': token,
          },
        });

        if (graphResponse.ok) {
          const graphSvg = await graphResponse.text();
          setGraphData(graphSvg);
        } else {
          console.log('Error fetching graph data from Pixe.la');
        }
      } catch (error) {
        console.log("Error:", error);
        setErrorMsg('Failed to load data');
      }
    };

    fetchHabitsAndGraph();
  }, [username]);

  // Open and close modal
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <div className="habit-tracker">
      <h3>Your Habits</h3>

      {/* Add Task Button */}
      <button className="taskbutton" onClick={openCreateModal}>
        Add New Task
      </button>

      {/* Display Graph */}
      {graphData ? (
        <div className="habit-graph">
          <img src={`data:image/svg+xml;base64,${btoa(graphData)}`} alt="Habit Tracker Graph" />
        </div>
      ) : (
        <p>{errorMsg || 'Graph loading...'}</p>
      )}

      {/* List Habits */}
      <div className="habit-list">
        {habits.length > 0 ? (
          habits.map(habit => (
            <div key={habit.id} className="habit-item">
              <span>{habit.title}</span>
            </div>
          ))
        ) : (
          <p>No habits available.</p>
        )}
      </div>

      {/* Create Habit Modal */}
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateHabit
              onClose={closeCreateModal}
              onHabitCreated={setHabits}
              graphID={graphID}  // Pass graphID (based on username) to CreateHabit
            />
            <button className="taskbutton close" onClick={closeCreateModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitTracker;
