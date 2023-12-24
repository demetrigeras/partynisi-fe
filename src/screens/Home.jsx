import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <div>
      <h1>Welcome to Dion</h1>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default Home;