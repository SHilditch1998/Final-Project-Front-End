// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import readcookie from "../../utils/readcookie";

// const DeleteUser = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     const token = readcookie("jwt_token");

//     try {
//       // Step 1: Delete the user account
//       const response = await fetch("http://localhost:5003/Account/DeleteDuckling", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       });

//       // Attempt to read the response as JSON first, and handle non-JSON responses
//       let output;
//       try {
//         output = await response.json();
//       } catch (error) {
//         console.error("Failed to parse JSON:", error);
//         output = { message: "Invalid response from the server" };
//       }

//       if (response.ok) {
//         setMessage("User deleted successfully!");

//         // Step 2: Delete the corresponding Pixela graph
//         const deleteGraphResponse = await deleteGraph(output.userId); // assuming output contains userId
//         if (deleteGraphResponse.ok) {
//           console.log("Graph deleted successfully!");
//           setMessage("User and graph deleted successfully!");

//           navigate("/");
//         } else {
//           setMessage("User deleted, but failed to delete the graph.");
//         }

//       } else {
//         setMessage(`Error: ${output.message || 'Failed to delete user.'}`);
//       }
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   // Function to delete a graph using Pixela API
//   const deleteGraph = async (userId) => {
//     const token = "tokensecret"; // Your Pixela token (since it's a shared account)
//     const graphUser = "graphuser"; // Your Pixela username (shared for all users)

//     return await fetch(`https://pixe.la/v1/users/${graphUser}/graphs/${userId}`, {
//       method: "DELETE",
//       headers: {
//         "X-USER-TOKEN": token,
//       },
//     });
//   };

//   return (
//     <div className="deletebox">
//       <h1 className="delUser">DELETE USER</h1>
//       <form onSubmit={submitHandler}>
//         <label>Email</label><br />
//         <input 
//           type="text" 
//           name="email" 
//           onChange={(event) => setEmail(event.target.value)} 
//         /><br /><br />

//         <label>Password</label><br />
//         <input 
//           type="password" 
//           name="password" 
//           onChange={(event) => setPassword(event.target.value)} 
//         /><br /><br />

//         <input className="delbtn" type="submit" value="CONFIRM" />
//       </form>
//       <p style={{ color: message.startsWith('Error') ? 'red' : 'green', fontWeight: 'bold' }}>
//         {message}
//       </p>
//       <hr />
//     </div>
//   );
// };

// export default DeleteUser;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import readcookie from "../../utils/readcookie";
import eraseCookie from "../../utils/eraseCookie";  // utility to remove cookie

const DeleteUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = readcookie("jwt_token");

    try {
      // Step 1: Delete the user account
      const response = await fetch("http://localhost:5003/Account/DeleteDuckling", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Attempt to read the response as JSON
      let output;
      try {
        output = await response.json();
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        output = { message: "Invalid response from the server" };
      }

      if (response.ok) {
        setMessage("User deleted successfully!");

        // Step 2: Delete the corresponding Pixela graph
        const deleteGraphResponse = await deleteGraph(output.userId);
        if (deleteGraphResponse.ok) {
          setMessage("User and graph deleted successfully!");
        } else {
          setMessage("User deleted, but failed to delete the graph.");
        }

        // Step 3: Log out the user by clearing the token and redirecting
        eraseCookie("jwt_token"); // Clear the token from the cookies
        navigate("/login"); // Redirect to login page or home

      } else {
        setMessage(`Error: ${output.message || 'Failed to delete user.'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Function to delete a graph using Pixela API
  const deleteGraph = async (userId) => {
    const token = "tokensecret"; // Your Pixela token (since it's a shared account)
    const graphUser = "graphuser"; // Your Pixela username (shared for all users)

    return await fetch(`https://pixe.la/v1/users/${graphUser}/graphs/${userId}`, {
      method: "DELETE",
      headers: {
        "X-USER-TOKEN": token,
      },
    });
  };

  return (
    <div className="deletebox">
      <h1 className="delUser">DELETE USER</h1>
      <form onSubmit={submitHandler}>
        <label>Email</label><br />
        <input 
          type="text" 
          name="email" 
          onChange={(event) => setEmail(event.target.value)} 
        /><br /><br />

        <label>Password</label><br />
        <input 
          type="password" 
          name="password" 
          onChange={(event) => setPassword(event.target.value)} 
        /><br /><br />

        <input className="delbtn" type="submit" value="CONFIRM" />
      </form>
      <p style={{ color: message.startsWith('Error') ? 'red' : 'green', fontWeight: 'bold' }}>
        {message}
      </p>
      <hr />
    </div>
  );
};

export default DeleteUser;
