import React from 'react';
import Login from './Login';
import Profile from './Profile.jsx';
import Navbar from './Navbar';

const App = () => (
  <div>
    <h2>Login</h2>
    <Login />
    <Navbar />
    {/* <Profile /> */}
  </div>
);

export default App;