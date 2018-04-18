import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import { Button, Segment, Input, Header } from 'semantic-ui-react';
import {setUser, setCurrentUser, changeCurrentUsersPosts} from '../actions/index.js';

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
        let currUser = (context.props.setCurrentUser(res.data).payload);
        sessionStorage.setItem('token', res.headers.authorization);

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
        <Segment textAlign='center' size='massive' inverted color='blue'> fakebook </Segment>

        <div className="welcome">Welcome!</div>

        <div className="loginInputs">
          <Input size="huge" name="username" placeholder="username" onChange={this.onChangeHandler.bind(this)}></Input>

          <Input size="huge" name="password" placeholder="password" type="password" onChange={this.onChangeHandler.bind(this)} ></Input>

        </div>
        
        <div className="loginButtons">
          <Button color='blue' size="huge" onClick={this.onLoginClick.bind(this)}>Login</Button>
          <Button color='blue' size="huge" onClick={this.onSignupClick.bind(this)}>Sign Up</Button>
            
        </div>
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
