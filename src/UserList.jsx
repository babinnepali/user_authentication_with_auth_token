
import React from 'react';

function UserList({ users }) {
  if (!Array.isArray(users) || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <div>
            <h2 className="font-bold">{user.username}</h2>
            <p>{user.email}</p>
            <p>{user.password}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
