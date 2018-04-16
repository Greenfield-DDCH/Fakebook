import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setCurrentUser, setUser, changeCurrentUsersPosts} from '../actions/index.js';
import Profile from './Profile';

import axios from 'axios';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameToSearch: ''
    };
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSearchButtonClick() {
    var context = this;
    axios({
      method: 'get',
      url: `/api/search/${this.state.usernameToSearch}`,
      headers: { token: sessionStorage.getItem('token') },
    }).then((response) => {
      context.props.setCurrentUser(response.data.results[0]);
      //Search for posts, will probably need to grab friends as well
      //fetch the CurrentProfile's posts and update them
      axios({
        method: 'get',
        url: `/api/posts/${context.props.currentUser.id}`,
        headers: { token: sessionStorage.getItem('token') },
      }).then((res)=>{
        console.log('successful get', res);
        context.props.changeCurrentUsersPosts(res.data);
      });

    })
      .catch(function (error) {
        console.log(error);
      });
  }

  onHomeButtonClick() {
    this.props.setCurrentUser(this.props.user);
    let context = this;
    axios({
      method: 'get',
      url: `/api/posts/${context.props.currentUser.id}`,
      headers: { token: sessionStorage.getItem('token') },
    }).then((res)=>{
      console.log('successful get', res);
      context.props.changeCurrentUsersPosts(res.data);
    });
    //set current user to logged in user
  }

  onLogoutButtonClick() {
    sessionStorage.clear();
    this.props.setUser(null);
  // delete current session/ set logged in user to null
  }
  
  render() {
    return (
      <div>
        <button onClick={this.onHomeButtonClick.bind(this)}>Home</button>

        <input name="usernameToSearch" id="search" placeholder="Search" onChange={this.onChangeHandler.bind(this)}/>

        <button onClick={this.onSearchButtonClick.bind(this)}>Search</button>

        <button onClick={this.onLogoutButtonClick.bind(this)}>Logout</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    currentUser: state.currentUser,
    currentUserPosts: state.currentUserPosts
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentUser,
    setUser,
    changeCurrentUsersPosts
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Navbar);
