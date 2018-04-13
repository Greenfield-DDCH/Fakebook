import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setCurrentUser} from '../actions/index.js';
import {setUser} from '../actions/index.js';
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
    axios.get(`/api/search/${this.state.usernameToSearch}`)
      .then(function (response) {
        context.props.setCurrentUser(response.data.results[0]);
        // console.log('get response data', response.data.results[0]);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onHomeButtonClick() {
    console.log('home button clicked');
    this.props.setCurrentUser(this.props.user);
    //set current user to logged in user
  }

  onLogoutButtonClick() {
    console.log('Logout button clicked');
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
    currentUser: state.currentUser
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentUser: setCurrentUser,
    setUser: setUser
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Navbar);
