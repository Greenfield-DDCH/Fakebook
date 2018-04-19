import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FriendThumbnail from './FriendThumbnail';
import {getFriends} from '../actions/index.js';

class FriendList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const context = this;
    axios({
      method: 'get',
      url: `/api/friends/${context.props.currentProfile.id}`,
      headers: { token: sessionStorage.getItem('token') },
    }).then((response) => {
      context.props.getFriends(response.data.friends);
    })
      .catch(function (error) {
        console.log("ERROR: ",error);
      });
  }
  
  returnButton() {
    this.props.returnToProfile();
  }

  render() {
    console.log("here",this.props.currentProfileFriends);
    return (
      <div>
        <h1>{this.props.currentProfile.username}'s Friends</h1>

          { this.props.currentProfileFriends ? 
            this.props.currentProfileFriends.map((user) => { return <FriendThumbnail username={user.username} picture={user.picture} key={user.id}/>; }) 
            : null }

        <button onClick={this.returnButton.bind(this)}>Return to Profile</button>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    loggedInAs: state.user,
    currentProfile: state.currentUser, 
    currentProfileFriends: state.friends
  };
};

const matchDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    getFriends
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FriendList);