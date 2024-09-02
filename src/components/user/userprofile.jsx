import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import readcookie from "../../utils/readcookie";

const UserProfile = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [listOn, setListOn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = readcookie("jwt_token");
      if (!token) {
        setError("You must be logged in to view this page.");
        return;
      }

      const response = await fetch("INSERT BACKEND URL HERE", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Corrected template literal
        },
      });

      const output = await response.json();
      if (response.ok) {
        setUsername(output.username);
        setEmail(output.email);
        setAvatar(output.avatar);
        setTodoList(output.todoList);
        setStatus(output.status);
        setListOn(true);
        setError(null);
      } else {
        setError(output.message || "Failed to fetch user data.");
        setListOn(false);
      }
    };

    fetchData();
  }, []);

  const addTaskHandler = () => {
    if (newTask.trim()) {
      setTodoList([...todoList, { task: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTaskHandler = (index) => {
    const updatedList = todoList.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTodoList(updatedList);
    setStatus(updatedList.filter(item => item.completed).length / updatedList.length * 100);
  };

  return (
    <div>
      <h1>{username}</h1>
      {avatar && <img src={avatar} alt="User Avatar" width="100" />}
      <h2>Email: {email}</h2>
      <div>
        <label>Status:</label>
        <progress value={status} max="100"></progress>
      </div>

      <div>
        <h3>To-Do List</h3>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="New Task" 
        />
        <button onClick={addTaskHandler}>Add Task</button>
        <ul>
          {todoList.map((item, index) => (
            <li key={index}>
              <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.task}
              </span>
              <button onClick={() => completeTaskHandler(index)}>
                {item.completed ? 'Undo' : 'Complete'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!listOn && <h1>Please login to proceed</h1>}
    </div>
  );
};

export default UserProfile;
