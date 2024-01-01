import React, { useState } from 'react';
import { signUp } from '../services/user.js';
import { useNavigate } from 'react-router-dom';
import cartoonpartimg from "./cartooparty.jpeg"
const SignUp = (props) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isError: false,
    errorMsg: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorMsg = '';

    if (name === 'password') {
      // Perform password validation
      if (
        value.length < 8 ||
        !/\d/.test(value) ||
        !/[a-zA-Z]/.test(value) ||
        !/[!@#$%^&*]/.test(value) ||
        /(.)\1\1/.test(value)
      ) {
        errorMsg = 'Password should be at least 8 characters long and meet the requirements.';
      }
    }

    setForm({
      ...form,
      [name]: value,
      isError: false,
      errorMsg: errorMsg,
    });
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    const { setUser } = props;
    const { password, passwordConfirmation } = form;

    // Perform password validation before submitting the form
    if (
      password.length < 8 ||
      !/\d/.test(password) ||
      password !== passwordConfirmation
    ) {
      setForm((prevForm) => ({
        ...prevForm,
        isError: true,
        errorMsg: "Password must be at least 8 characters long and contain at least one number.",
      }));
      return; // Stop the form submission
    }

    try {
      const user = await signUp(form);
      setUser(user);
      navigate('/create-profile');
    } catch (error) {
      console.error(error);
      setForm({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        isError: true,
        errorMsg: 'Password did not match',
      });
    }
  };

  const { name, email, password, passwordConfirmation, isError, errorMsg } = form;

  return (
    <div className='signUp/In image' style={{ 
      backgroundImage: `url(${cartoonpartimg })`,
      backgroundSize: 'cover', // Cover the entire space of the div
      backgroundPosition: 'center', // Center the image
      backgroundRepeat: 'no-repeat', // Do not repeat the image
      width: '100vw', // Set width to full viewport width
      height: '100vh', // Set height to full viewport height
      position: 'absolute', // Position it over the whole screen
      top: '0',
      left: '0',
      overflow: 'hidden'}}>
    <div className='sign-up-in-form-container'>
      <div className='sign-up-in-box'>
        <h3>Sign Up</h3>
        {isError && <p className='error-message'>{errorMsg}</p>}
        <form onSubmit={onSignUp}>
          <label>Name</label>
          <input
            required
            type='name'
            name='name'
            value={name}
            placeholder='Enter Your Name'
            onChange={handleChange}
          />

          <label>Email address</label>
          <input
            required
            type='email'
            name='email'
            value={email}
            placeholder='Enter email'
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            required
            name='password'
            value={password}
            type='password'
            placeholder='Password'
            onChange={handleChange}
          />
        <label>Password Confirmation</label>
        <input
          required
          name='passwordConfirmation'
          value={passwordConfirmation}
          type='password'
          placeholder='Confirm Password'
          onChange={handleChange}
        />
        <button type='submit'>Sign Up</button>
      </form>
      </div>
    </div>
    </div>
  )
}

export default SignUp
