import React, {Component} from 'react';
import CommentEntry from './commentEntry';

class CommentList extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        {this.props.comments.map(function(comment){
          return <CommentEntry comment={comment}/>
        })}
      </div>
    );
  }
}

export default CommentList;