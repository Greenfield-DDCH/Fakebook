import React from 'react';
import {connect} from 'react-redux';

import Login from './Login';
import Profile from './Profile.jsx';
import Navbar from './Navbar.jsx';

const App = (props) => (
  <div>
    
    {!props.loggedInAs ? null : <Navbar />}
    
    {!props.loggedInAs ? <Login />: null}
    {!props.loggedInAs ? null : <Profile/>}
  </div>
);

const mapStateToProps = function(state){
  return {
    loggedInAs: state.user,
    currentProfilePosts: state.currentUserPosts
  }
}

export default connect(mapStateToProps)(App);