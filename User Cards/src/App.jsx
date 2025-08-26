import { useState } from 'react';
import UserCard from './components/UserCard';
import EditModal from './components/EditModal';
import './App.css';

function App() {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      image: "https://picsum.photos/200/300",  
      name: "Alice", 
      age: 25, 
      profession: "Designer",
      description: "Creative designer with a passion for minimalism and user-friendly design."
    },
    { 
      id: 2, 
      image: "https://picsum.photos/300/300", 
      name: "Bob", 
      age: 30, 
      profession: "Developer",
      description: "Full-stack developer who loves building scalable web applications."
    },
    { 
      id: 3, 
      image: "https://picsum.photos/250/350", 
      name: "Charlie", 
      age: 28, 
      profession: "Doctor",
      description: "Dedicated doctor who believes in holistic patient care and wellness."
    }
  ]);

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
