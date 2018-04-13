import React, {Component} from 'react';
import PostEntry from './postEntry';

class PostList extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        {this.props.posts.map(function(post){
          return <PostEntry post={post}/>
        })}
      </div>
    );
  }
}

export default PostList;

