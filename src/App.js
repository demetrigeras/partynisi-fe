import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from'react';
import { verifyUser } from "./services/user.js";
import {Route, Routes} from 'react-router-dom';
import Home from './screens/Home.jsx';
import SignUp from './screens/SignUp.jsx';
import SignIn from './screens/SignIn.jsx';  
import SignOut from './screens/SignOut.jsx';
import CreateProfile from './screens/CreateProfile.jsx';
import Dionhp from './screens/Dionhp.jsx';
import Nav from './components/Nav.jsx';
import Profilehp from './screens/Profile.jsx';
function App() {


  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser()
      user ? setUser(user) : setUser(null)
    }
    fetchUser()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} user={user} />
        <Route path="/create-profile" element={<CreateProfile user={user} />} />
        <Route path="/dionhp" element={<Dionhp user={user}  />} />
        <Route path="/profile/:userId" element={<Profilehp user={user}  />} />
        <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
      <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
      <Route path="/sign-out" element={<SignOut setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
