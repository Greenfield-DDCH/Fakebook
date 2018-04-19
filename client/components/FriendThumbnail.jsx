import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Image} from 'semantic-ui-react';

import {setCurrentUser} from '../actions/index.js';

class FriendThumbnail extends Component {
  constructor(props) {
    super(props);
  }

  onUsernameClick(usernames, pictures, userId) {
    var user = {id: userId, username: usernames, password: '', picture: pictures};
    this.props.setCurrentUser(user);
    this.props.goToProfile();
  }

  render() {
    return (
      <div className="friendPageAvatar" onClick={() => this.onUsernameClick(this.props.username, this.props.picture, this.props.userId)}>
        <Image size='tiny' src={this.props.picture} avatar />
        <span>{this.props.username}</span>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setCurrentUser
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(FriendThumbnail);
