import React from 'react';
import Login from './Login';
import Profile from './Profile.jsx';
import Navbar from './Navbar';
import Post from './post';

const App = () => (
  <div>
    <h2>Login</h2>
    <Navbar />
    <Login />
    <Profile />
     <Post /> 
     {/*<Post /> */}
     {/*<Profile /> */}

  </div>
);

export default App;