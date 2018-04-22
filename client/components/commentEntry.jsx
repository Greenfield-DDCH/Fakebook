import React, {Component} from 'react';

class CommentEntry extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="commentEntry">
        <div className="comment">
          {this.props.comment.username + ": "}

          {this.props.comment.post}
        </div>
      </div>
    );
  }
}

export default CommentEntry;
