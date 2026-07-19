import React from 'react'
import axios from 'axios'
const App = () => {

  const getData = async () => {
    const response = await axios.get("/api/data");
    console.log(response.data);
  }

  const [users, setUsers] = React.useState([]);
  const getUsers = async () => {
    const response = await axios.get("/api/users");
    setUsers(response.data);
  }
  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>

      <div>
        <h1>Front End</h1>
      </div>

      <div className='flex justify-center items-center w-full h-screen'>
        <button onClick={getData}>Get Data</button>
      </div>


      <div className='flex justify-center items-center w-full h-screen'>
        <h1>Users</h1>
        <ul className='flex flex-col items-center'>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default App