import React, {Component} from 'react';
import PostEntry from './postEntry';

class PostList extends Component{
  constructor(props){
    super(props);

    this.state = {
      posts: this.props.posts
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({posts: nextProps.posts});
  }

  render(){
    return (
      <div>
        {this.state.posts.map(function(post){
          return <PostEntry post={post} comments={post.comments}/>
        })}
      </div>
    );
  }
}

export default PostList;

