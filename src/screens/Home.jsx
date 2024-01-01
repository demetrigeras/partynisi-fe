import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './signinup.jpeg'

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <div className='welcome' style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', // Cover the entire space of the div
      backgroundPosition: 'center', // Center the image
      backgroundRepeat: 'no-repeat', // Do not repeat the image
      width: '100vw', // Set width to full viewport width
      height: '100vh', // Set height to full viewport height
      position: 'absolute', // Position it over the whole screen
      top: '0',
      left: '0',
      overflow: 'hidden' // Hide the overflow
       // Make it full height of the viewport
    }}>
      <div className='welcome-overlay'>
      <h1>Welcome to Dion</h1>
      <div className='SignupIntro'>
    <h2>Dion is a Party Scheduling App where you can create and view other hosts events</h2>
        
      </div>
      </div>

      <div className='SignIn-Up-container'>
      <button style={{ marginRight: '1.5%' }} className='SignIn-Up-button' onClick={handleSignUp}>Sign Up</button>
      <button className='SignIn-Up-button' onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}

export default Home;