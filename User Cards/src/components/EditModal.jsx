import React, { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState(user || {});

  // Reset form when modal opens with a new user
  useEffect(() => {
    setFormData(user || {});
  }, [user]);

  if (!isOpen || !user) return null;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle save
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Send updated user to parent
    onClose();        // Close modal
  };

  return (