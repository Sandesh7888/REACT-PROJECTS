// import React, { useState, useEffect } from 'react';

// const EditModal = ({ isOpen, onClose, user, onSave }) => {
//   const [formData, setFormData] = useState(user || {});

//   // Reset form when modal opens with a new user
//   useEffect(() => {
//     setFormData(user || {});
//   }, [user]);

//   if (!isOpen || !user) return null;

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle save
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData); // Send updated user to parent
//     onClose();        // Close modal
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-gray-600 rounded-2xl shadow-lg w-96 p-6 relative animate-fadeIn">
//         {/* Close button (top right) */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
//         >
//           ✕
//         </button>

//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit User</h2>

//         <form onSubmit={handleSubmit} className="flex flex-col">
//           <input
//             type="text"
//             name="name"
//             value={formData.name || ""}
//             onChange={handleChange}
//             placeholder="Name"
//             className="border border-gray-300 p-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           <input
//             type="text"
//             name="profession"
//             value={formData.profession || ""}
//             onChange={handleChange}
//             placeholder="Profession"
//             className="border border-gray-300 p-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           <textarea
//             name="description"
//             value={formData.description || ""}
//             onChange={handleChange}
//             placeholder="Description"
//             className="border border-gray-300 p-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-24"
//           ></textarea>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditModal;
