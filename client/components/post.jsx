import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import {changeCurrentUsersPosts} from '../actions/index.js';
import PostList from './postList';

export class Post extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      postText: '',
      username: '',
      // posts: this.props.posts
      //userImage: null,
      //timeStamp: null,
      //Postimage: null,
      //videoUrl: null
    };
  }

  onChangePostText(e) {
    this.setState({
      postText: e.target.value
    });
  }// grab value of textArea value and set state.

  handlePostButton() {
    const context = this;
    axios({
      method: 'post',
      url: `/api/posts/${this.props.currentProfile.id}`,
      headers: { token: sessionStorage.getItem("token") },
      data: {
        postText: this.state.postText,
        whoseProfile: this.props.currentProfile.id,
        owner: this.props.loggedInAs.id,
        type: 0,
        // timestamp:
      }
    }).then((res) => {
      console.log('successful post', res);
      //Fetch the data and change the profile's posts
      axios({
        method: 'get',
        url: `/api/posts/${context.props.currentProfile.id}`,
        headers: { token: sessionStorage.getItem("token") },
      }).then((res)=>{
        console.log('successful get', res);
        context.props.changeCurrentUsersPosts(res.data);
      });
    });
  }

  render() {
    return (
      <div className="postToWall">
        <textarea value={this.state.postText} name="postText" placeholder="Write a post..." onChange={this.onChangePostText.bind(this)}/>
        <button className="postButton" onClick={this.handlePostButton.bind(this)}>Post </button>
        <div className="">
          <PostList posts={!this.props.currentProfilePosts ? [] : this.props.currentProfilePosts}/> 
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    currentProfile: state.currentUser,
    loggedInAs: state.user,
    currentProfilePosts: state.currentUserPosts
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    changeCurrentUsersPosts
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Post);

