import React, {Component} from 'react';

class CommentEntry extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="commentEntry">
        this is a comment
        {this.props.comment.username}
        {this.props.comment.post}
      </div>
    );
  }
}

export default CommentEntry;