import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserForm({ fetchUsers, editUser }) {
    const [user, setUser] = useState({ name: '', email: '', age: '' });

    useEffect(() => {
        if (editUser) setUser(editUser);
    }, [editUser]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (user._id) {
            await axios.put(`http://localhost:5000/api/users/${user._id}`, user);
        } else {
            await axios.post('http://localhost:5000/api/users', user);
        }
        setUser({ name: '', email: '', age: '' });
        fetchUsers();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} placeholder="Name" />
            <input value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="Email" />
            <input value={user.age} onChange={e => setUser({ ...user, age: e.target.value })} placeholder="Age" type="number" />
            <button type="submit">{user._id ? "Update" : "Create"} User</button>
        </form>
    );
}
