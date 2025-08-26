import React from "react";

const UserCard = ({ users, onEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {users.map((user) => (
        <div
          className="user-card bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          key={user.id}
        >
          <div className="image-container w-full h-48 overflow-hidden">
            <img
              src={user.image}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="information-container p-4 flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.profession}</p>
            <p className="text-gray-500 mt-2 text-sm">{user.description}</p>
            <button
              onClick={() => onEdit(user)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-colors duration-300"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
