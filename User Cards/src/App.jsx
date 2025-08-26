import { useState } from 'react';
import UserCard from './components/UserCard';
import EditModal from './components/EditModal';
import './App.css';
import user from './data/user';

function App() {
  const [users, setUsers] = useState(user);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with selected user
  const onEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Save updated user and update state immutably
  const handleSave = (updatedUser) => {
    const newUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    setUsers(newUsers);
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>

      <UserCard users={users} onEdit={onEdit} />

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={handleSave}
      />
    </>
  );
}

export default App;
