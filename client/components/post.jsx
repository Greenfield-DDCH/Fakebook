import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import {post} from '../actions/index';
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
    axios({
      method: 'get',
      url: `/profile/${this.props.currentProfile}`,
    }).then((res)=>{
      console.log("successful get",res);
    });
  }

  onChangePostText(e){
    this.setState({
      postText: e.target.value
    });
  }// grab value of textArea value and set state.

  handlePostButton(){
    // console.log(this.props);
    axios({
      method: 'post',
      url:`/profile/${this.props.currentProfile}`,
      data: {
        postText: this.state.postText,
        whoseProfile: this.props.currentProfile,
        owner: this.props.loggedInAs
      }
    }).then((res) => {
      console.log("successful post", res);
    });
  }

  render(){
    console.log(this.props);
    return (
      <div className="post">
        <textarea value={this.state.postText} name="postText" placeholder="Write a post..." onChange={this.onChangePostText.bind(this)}/>
        <button className="postButton" onClick={this.handlePostButton.bind(this)}>Post </button>
        {/* <PostList/> terinary if posts.length > 1 */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Post);

