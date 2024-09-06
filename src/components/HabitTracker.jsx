import { useState, useEffect } from 'react';

const HabitTracker = () => {
  const [graphData, setGraphData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [updateCount, setUpdateCount] = useState(0);

  const username = 'graphuser';  // Username for the generic account
  const graphID = 'graph0001';   // Graph ID for the specific graph
  const token = 'tokensecret';   // Token for the generic account

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
  }, [username, graphID, updateCount]);

  const handleAddOrUpdateTask = async () => {
    try {
      const formattedDate = date.replace(/-/g, '');
      const response = await fetch(`https://pixe.la/v1/users/${username}/graphs/${graphID}/${formattedDate}`, {
        method: 'PUT',  // 'POST' for creating, 'PUT' for updating
        headers: {
          'Content-Type': 'application/json',
          'X-USER-TOKEN': token,
        },
        body: JSON.stringify({
          quantity: quantity.toString(),
          thanksCode:"639becb61a3bd96d9f521acfca7310eba71e465253e685d13c7be213fa5fa940"
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMsg('Task added/updated successfully');
      } else {
        setResponseMsg(data.message || 'Failed to add/update task');
      }
      setUpdateCount(updateCount+1);
    } catch (error) {
      console.error('Error:', error);
      setResponseMsg('Error adding/updating task');
    }
  };

  const handleDeleteTask = async () => {
    try {
      const formattedDate = date.replace(/-/g, '');
      const response = await fetch(`https://pixe.la/v1/users/${username}/graphs/${graphID}/${formattedDate}`, {
        method: 'DELETE',
        headers: {
          'X-USER-TOKEN': token,
        },
      });

      if (response.ok) {
        setResponseMsg('Task deleted successfully');
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
        <input
          className="task-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter Date (yyyy-MM-dd)"
        />
        <input
          className="task-input"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter Quantity"
        />
        <button className="taskbutton" onClick={handleAddOrUpdateTask}>Add/Update Task</button>
      </div>

      <div>
        <h4>Delete Task</h4>
        <input
          className="task-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter Date (yyyy-MM-dd)"
        />
        <button className="taskbutton" onClick={handleDeleteTask}>Delete Task</button>
      </div>

      {responseMsg && (
        <p style={responseMessageStyle}>{responseMsg}</p>
      )}
    </div>
  );
};

export default HabitTracker;
