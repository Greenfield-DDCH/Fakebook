import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeIsFriend} from '../actions/index.js';
import axios from 'axios';

class FriendButton extends Component {

  handleClick() {
    
    this.props.changeIsFriend(true);
   
    const payload = {
      UserA: this.props.loggedInAs.id,
      UserB: this.props.currentProfile.id
    };
    
    axios.post('/api/friends', payload)
      .then(res => {
        console.log('this is a successful response', res);
      }).catch(err => {
        console.log('Error on friend add  dawgg', err);
      });
  }

  render() {
    return (
      //could insert another ternary and not display text if it is logged in users profile
      <div className='friendButton'>
        {this.props.isFriend ? 'yooooo youre already friends!' 
          :
          <button  onClick={()=> this.handleClick()}>Add as Friend!</button>}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    currentProfile: state.currentUser,  
    loggedInAs: state.user,
    isFriend: state.isFriend
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeIsFriend
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(FriendButton);