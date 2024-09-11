import React, { useState, useEffect } from 'react';
import CreateHabit from './CreateHabit'; 
import DeleteHabit from './DeleteHabit';
import TaskListModal from './TaskListModal';
import '../../App.css';
import '../../index.css';
import readcookie from '../../utils/readcookie';

const HabitTracker = ({ username, graphName }) => {
  const [habits, setHabits] = useState([]);
  const [graphData, setGraphData] = useState(null);  // State for storing the graph
  const [errorMsg, setErrorMsg] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTaskListModalOpen, setIsTaskListModalOpen] = useState(false);

  const pixelaUser = 'graphuser';  // The Pixe.la user (always 'graphuser')
  const graphID = graphName;  // Use username as the graph ID
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

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);
  
  const openTaskListModal = () => setIsTaskListModalOpen(true);
  const closeTaskListModal = () => setIsTaskListModalOpen(false);

  const handleEditHabit = async (habitId, newTitle) => {
    console.log(`Edit Habit: ${habitId}, New Title: ${newTitle}`);
    
    const jwtToken = readcookie("jwt_token");
    if (!jwtToken) {
      console.error("User not authenticated");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5003/Habit/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          HabitId: habitId,  // Sending HabitId in the request body
          editiedHabit: newTitle // Sending the updated title in the request body (as per backend's field)
        }),
      });
  
      if (response.ok) {
        // Update the habits state with the new title
        setHabits((prevHabits) =>
          prevHabits.map(habit =>
            habit.id === habitId ? { ...habit, title: newTitle } : habit
          )
        );
        console.log(`Habit ${habitId} successfully updated.`);
      } else {
        console.error(`Failed to update habit ${habitId}`);
      }
    } catch (error) {
      console.error("Error occurred while updating habit:", error);
    }
  };
  

  const handleCompleteHabit = async (habitId) => {
    console.log(`Complete Habit: ${habitId}`);
    
    const jwtToken = readcookie("jwt_token");
    if (!jwtToken) {
      console.error("User not authenticated");
      return;
    }
  
    try {
      // Send request to update habit
      const response = await fetch(`http://localhost:5003/Habit/completed/${habitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
  
      if (response.ok) {
        setHabits((prevHabits) =>
          prevHabits.map(habit =>
            habit.id === habitId ? { ...habit, completed: true } : habit
          )
        );
        console.log(`Habit ${habitId} successfully completed.`);
      } else {
        console.error(`Failed to complete habit ${habitId}`);
      }
    } catch (error) {
      console.error("Error occurred while completing habit:", error);
    }
  };
  

  const handleDeleteHabit = async (habitId, habitTitle) => {
    console.log(`Delete Habit: ${habitId}`);
  
    const jwtToken = readcookie("jwt_token");
    if (!jwtToken) {
      console.error("User not authenticated");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5003/Habit/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Habit-Id': habitId,   // Pass HabitId in headers
          'X-Habit-Title': habitTitle   // Pass title in headers
        },
        // No body sent
      });
  
      if (response.ok) {
        // After successfully deleting the habit, update the state
        setHabits((prevHabits) => prevHabits.filter(habit => habit.id !== habitId));
        console.log(`Habit ${habitId} successfully deleted.`);
      } else {
        console.error(`Failed to delete habit ${habitId}`);
      }
    } catch (error) {
      console.error("Error occurred while deleting habit:", error);
    }
  };
  


  return (
    <div className="habit-tracker">

      <h2>Your Habits</h2>

      {/* Display Graph */}
      {graphData ? (
        <div className="habit-graph">
          <img src={`data:image/svg+xml;base64,${btoa(graphData)}`} alt="Habit Tracker Graph" />
        </div>
      ) : (
        <p>{errorMsg || 'Graph loading...'}</p>
      )}

  
      <button className="taskbutton" onClick={openCreateModal}>
        Add New Task
      </button>

    
      <button className="taskbutton" onClick={openTaskListModal}>
        Show Tasks
      </button>


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


      {/* Task List Modal */}
      {isTaskListModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TaskListModal
              habits={habits}
              onEdit={handleEditHabit}
              onComplete={handleCompleteHabit}
              onDelete={handleDeleteHabit}
            />
            <button className="taskbutton close" onClick={closeTaskListModal}>
              Close
            </button>
          </div>
        </div>
      )}

      

    </div>
  );
};


export default HabitTracker;
