import { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);

    const fetchUsers = async () => {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>User CRUD App (MERN)</h1>
            <UserForm fetchUsers={fetchUsers} editUser={editUser} />
            <UserList users={users} fetchUsers={fetchUsers} setEditUser={setEditUser} />
        </div>
    );
}

export default App;
