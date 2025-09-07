import useForm from "../hooks/useForm.js";
import  validate from "../hooks/validate.js";
import React from "react";
import 'RegistrationForm.css';
const RegistrationForm = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(validate);

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Name Field */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>

          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

      
      </form>
    </div>
  );
};

export default RegistrationForm;
