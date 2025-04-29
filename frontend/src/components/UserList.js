import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const UserList = ({ refresh, onEdit }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, [refresh]);

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`/api/users/${id}`)
        .then(() => setUsers(users.filter(user => user._id !== id)))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="excel-wrapper">
      <h2>📋 User List (Excel View)</h2>
      <div className="excel-table">
        <div className="excel-row header">
          <div>Name</div>
          <div>Email</div>
          <div>Age</div>
          <div>Actions</div>
        </div>
        {users.map(user => (
          <div className="excel-row" key={user._id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.age}</div>
            <div className="actions">
              <button onClick={() => onEdit(user)} className="edit">
                <FaEdit />
              </button>
              <button onClick={() => deleteUser(user._id)} className="delete">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
