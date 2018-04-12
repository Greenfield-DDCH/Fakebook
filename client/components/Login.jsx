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
    }
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log('this is user', this.state);
  }

  // this.props.setUser({username: 'steve'})
  
  render() {
    return (
      <div>
      <input name="username" placeholder="username" onChange={this.onChangeHandler.bind(this)}></input>
      <br/>
      <input name="password" placeholder="password" type="password" onChange={this.onChangeHandler.bind(this)} ></input>
      <br/>
      <button>Login</button>
      <button>Sign Up</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({setUser: setUser}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
