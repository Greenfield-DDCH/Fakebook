import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Image} from 'semantic-ui-react';

import {setCurrentUser} from '../actions/index.js';

class FriendThumbnail extends Component {
  constructor(props) {
    super(props);
  }

  onUsernameClick(e) {
    console.log('name clicked', e.target);

    //still need to isolate current user from target
    // this.props.setCurrentUser();
  }

  render() {
    return (
      <div className="friendPageAvatar" onClick={this.onUsernameClick.bind(this)}>
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
