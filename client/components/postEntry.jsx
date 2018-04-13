import React, {Component} from 'react';


class PostEntry extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="PostEntry">

        {this.props.post.username}
        {this.props.post.post}
      </div>
    );
  }
}

export default PostEntry;