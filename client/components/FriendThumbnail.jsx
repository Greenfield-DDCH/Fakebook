import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Image} from 'semantic-ui-react';
import axios from 'axios';

import {setCurrentUser, changeCurrentUsersPosts, setCurrentUsersStatus} from '../actions/index.js';

class FriendThumbnail extends Component {
  constructor(props) {
    super(props);
  }

  onUsernameClick(username) {
    var context = this;
    console.log("this is username",username);
    axios({
      method: 'get',
      url: `/api/search/${username}`,
      headers: { token: sessionStorage.getItem('token') },
    }).then((response) => {
      console.log("Successful get:",response);

      //need the payload due to async issues with setting CurrentUser
      let payload = context.props.setCurrentUser(response.data.results[0]).payload;

      //Search for posts, will probably need to grab friends as well
      //fetch the CurrentProfile's posts and update them
      axios({
        method: 'get',
        url: `/api/posts/${payload.id}`,
        headers: { token: sessionStorage.getItem('token') },
      }).then((res)=>{
        console.log('successful get', res);
        context.props.changeCurrentUsersPosts(res.data);
      }).catch(function(err) {
        console.log(error);
      });

      axios.get(`/api/status/${payload.id}`).then(res => {
        context.props.setCurrentUsersStatus(res.data);
      });
    })
      .catch(function (error) {
        console.log(error);
      });
    this.props.goToProfile();
  }

  render() {
    return (
      <div className="friendThumbnailPicture" onClick={() => this.onUsernameClick(this.props.username)}>
        <Image size='tiny' src={this.props.picture} avatar />
        <br/>
        <span className="friendThumbnailName">{this.props.username}</span>
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
    setCurrentUser,
    changeCurrentUsersPosts,
    setCurrentUsersStatus
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(FriendThumbnail);
