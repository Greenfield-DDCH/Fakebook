import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import PostList from './postList';

const mapStateToProps = function(state){
  //console.log(state);
  return {
    currentProfile: 2,
    loggedInAs: 2
  }
}// current profile page, loggedInAs which user, defaulted to 1 and 2 for now need to access store. 


export class Post extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      postText: '',
      username: '',
      posts: []
      //userImage: null,
      //timeStamp: null,
      //Postimage: null,
      //videoUrl: null
    }
  }

  componentDidMount(){
    this.fetchPosts();
  }

  fetchPosts(){
    axios({
      method: 'get',
      url: `/api/posts/${this.props.currentProfile}`,
    }).then((res)=>{
      console.log("successful get",res);
      this.setPosts(res.data);
    });
  }

  setPosts(posts){
    this.setState({
      posts: posts
    });
  }

  onChangePostText(e){
    this.setState({
      postText: e.target.value
    });
  }// grab value of textArea value and set state.

  handlePostButton(){
    axios({
      method: 'post',
      url:`/api/posts/${this.props.currentProfile}`,
      data: {
        postText: this.state.postText,
        whoseProfile: this.props.currentProfile,
        owner: this.props.loggedInAs,
        type: 0,
        // timestamp:
      }
    }).then((res) => {
      console.log("successful post", res);
      this.fetchPosts();
    });
  }

  render(){
    return (
      <div className="post">
        <textarea value={this.state.postText} name="postText" placeholder="Write a post..." onChange={this.onChangePostText.bind(this)}/>
        <button className="postButton" onClick={this.handlePostButton.bind(this)}>Post </button>
        <PostList posts={this.state.posts}/> 
      </div>
    );
  }
}

export default connect(mapStateToProps)(Post);

