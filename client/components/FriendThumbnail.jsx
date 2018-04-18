import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
      <div>
        <li onClick={this.onUsernameClick.bind(this)}>{this.props.username}</li>
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
