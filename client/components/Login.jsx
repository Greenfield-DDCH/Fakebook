import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setUser} from '../actions/index.js';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log('this is user', this.state);
  }


  onLoginClick() {
    axios.get(`/api/user/${this.state.username}/${this.state.password}`)
      .then(res => {
        console.log(res.status);
      }).catch(err => {
        console.log('Error on Login GET request', err);
      });
  }

  onSignupClick() {
    console.log('sign up clicked');
    axios.post('/api/user', this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <input name="username" placeholder="username" onChange={this.onChangeHandler.bind(this)}></input>
        <br/>
        <input name="password" placeholder="password" type="password" onChange={this.onChangeHandler.bind(this)} ></input>
        <br/>
        <button onClick={this.onLoginClick.bind(this)}>Login</button>
        <button onClick={this.onSignupClick.bind(this)}>Sign Up</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user

  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({setUser: setUser}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Login);
