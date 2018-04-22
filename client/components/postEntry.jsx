import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Button, Divider, Segment, Icon} from 'semantic-ui-react';

import CommentEntry from './commentEntry';

export class PostEntry extends Component{
  constructor(props){
    super(props);

    this.state = {
      commentText: '',
      comments: this.props.post.comments,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({comments: nextProps.comments});
  }

  onChangeCommentText(e){
    this.setState({
      commentText: e.target.value
    });
  }

  setComments(comments){
    this.setState({
      comments
    });
  
  }

  fetchComments(){
    axios({
      method: 'get',
      url: `/api/comments/${this.props.post.id}/${this.props.currentProfile.id}`,
    }).then((res)=>{
      console.log("successful get********************",res);
      this.setComments(res.data);
    });
  }

  handleCommentButton(){
    axios({
      method: 'post',
      url:`/api/posts/${this.props.currentProfile.id}`,
      data: {
        commentText: this.state.commentText,
        whoseProfile: this.props.currentProfile.id,
        owner: this.props.loggedInAs.id,
        type: 1,
        parentId: this.props.post.id
        // timestamp:
      }
    }).then((res) => {
      console.log("successful Post", res);
      this.fetchComments();
    });
    this.setState({
      commentText: ''
    });
  }

  render(){
    return (

      <div className="postEntry">
       <Segment raised>

       {this.props.post.username === this.props.currentProfile.username ?       
        <div className="postUsername">
          {this.props.post.username}
        </div>
        : 
        <div>
          
          <div div className="postUsername">
            {this.props.post.username}
            <Icon name="caret right"/>
            {this.props.currentProfile.username}
          </div>
        </div>
      }

        <div className="postText">
          {this.props.post.post}
        </div>

        <div className="commentList">
          {this.state.comments.length >= 1 ? 
            this.state.comments.map(function(comment){
              return <CommentEntry comment={comment}/>
            })
            : 
            null
          }
        </div>
        
        <Divider fitted/>

        {!this.props.isFriend ? null :
          <div className="commentForm">
            <textarea value={this.state.commentText} name="commentText" placeholder="Write a Comment..." onChange={this.onChangeCommentText.bind(this)}/>

            <Button size="tiny" color="blue" className="postButton" onClick={this.handleCommentButton.bind(this)}>Comment </Button>
          </div>
        }
      
      </Segment>
      </div>
    ); 
  }
}

const mapStateToProps = function(state){
  return {
    currentProfile: state.currentUser,
    loggedInAs: state.user,
    isFriend: state.isFriend
  }
}

export default connect(mapStateToProps, )(PostEntry);