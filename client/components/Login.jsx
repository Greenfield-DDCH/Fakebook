import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setUser, setCurrentUser, changeCurrentUsersPosts} from '../actions/index.js';
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
    var context = this;

    const payload = {
      username: this.state.username,
      password: this.state.password
    };
    const config = {
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    }

    axios.post(`/api/user/login`, payload)
      .then(res => {
        console.log('this is response', res.headers.authorization);
        console.log('this is response data', res.data);
        context.props.setUser(res.data);
        console.log('hehiohrtiohry');
        let currUser = (context.props.setCurrentUser(res.data).payload);
        console.log('thisss is current user', currUser);
        sessionStorage.setItem('token', res.headers.authorization);
    // axios.get(`/api/user/${this.state.username}/${this.state.password}`)
    //   .then((res) => {
    //     context.props.setUser(res.data);
    //     let payload = (context.props.setCurrentUser(res.data).payload);
    //     sessionStorage.setItem('token', res.data.token);
        axios({
          method: 'get',
          url: `/api/posts/${currUser.id}`,
        }).then((res)=>{
          // console.log("successful get",res);
          context.props.changeCurrentUsersPosts(res.data);
        });
      }).catch(err => {
        console.log('Error on Login Post request dawgg', err);
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
        <h2>Login</h2>
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
  return bindActionCreators({setUser, setCurrentUser, changeCurrentUsersPosts}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Login);
