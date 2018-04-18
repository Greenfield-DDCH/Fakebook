import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import FriendThumbnail from './FriendThumbnail';

class FriendList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: null
    };
  }


  // 
  componentDidMount() {
    const context = this;
    axios({
      method: 'get',
      url: `/api/friends/${context.props.currentProfile.id}`,
      headers: { token: sessionStorage.getItem('token') },
    }).then((response) => {
      context.setState({
        friends: response.data.results
      });
      console.log(context.state);
      
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  returnButton() {
    this.props.returnToProfile();
  }

  render() {
    return (
      <div>
        <h1>{this.props.currentProfile.username}'s Friends</h1>
        <ul>
          { this.state.friends ? 
            this.state.friends.map((user) => { return <FriendThumbnail username={user.username} picture={user.picture} key={user.id}/>; }) 
            : null }
        </ul>
        <button onClick={this.returnButton.bind(this)}>Return to Profile</button>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    currentProfile: state.currentUser,  
  };
};

export default connect(mapStateToProps)(FriendList);