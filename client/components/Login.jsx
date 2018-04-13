/*import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setUser} from '../actions/index.js';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false,
      userLoggedIn: ''
    };
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log('this is user', this.state);
  }

  isLoggedInHandler() {
    console.log('Logged In Handler Fired');
    this.setState({ isLoggedIn: true });
  }

  onLoginHandler() {
    axios.get(`/api/user/login/${this.state.username}/${this.state.password}`).then(res => {
      console.log('Login Handler Fired');
      console.log(res.status);
      res.status === 200 && this.isLoggedInHandler();
    }).catch(err => {
      console.log('Error on Login GET request', err);
    });
  }

  render() {
    return (
      <div>
        <input name="username" placeholder="username" onChange={this.onChangeHandler.bind(this)}></input>
        <br/>
        <input name="password" placeholder="password" type="password" onChange={this.onChangeHandler.bind(this)} ></input>
        <br/>
        <button onClick={this.onLoginHandler.bind(this)}>Login</button>
        <button>Sign Up</button>
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

export default connect(mapStateToProps, matchDispatchToProps)(Login);*/
