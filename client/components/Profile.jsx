import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import {bindActionCreators} from 'redux';
import FriendButton from './FriendButton';
import Navbar from './Navbar';
import FriendList from './FriendList';

import Post from './post';
import {changeIsFriend} from '../actions/index.js';

export class Profile extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      pendingStatus: '',
      picture: null,
      posts: this.props.currentProfilePosts,
      seeFriends: false
      // isFriend : true
    };
  }

  componentDidMount() {
  }

  editStatus(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setStatus() {
    var payload = {
      status: this.state.status,
      userId: this.props.currentProfile.id
    };
    const config = {
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    };
    axios.post('/api/user/setstatus', payload, config)
      .then(response => {
        console.log('server replied with this button handler status: ', response);
        this.setState({
          pendingStatus: response.data.status
        });
      })
      .catch(err => {
        console.log('this is the error from server: ', err);
      });
  }

  seeFriends() {
    this.setState({
      seeFriends: !this.state.seeFriends
    });
  }

  editPicture() {
    this.setState({
      picture: null
    });
  }

  handleDrop(e) {
    var context = this;
    const formData = new FormData();
    const uploaders = e.map (file => {
      formData.append('file', file);
      formData.append('upload_preset', 'ed9m3yng');
      formData.append('api_key', '887545849876627');
      formData.append('timestamp', (Date.now() / 1000) | 0);
    });
    axios.post('https://api.cloudinary.com/v1_1/dtfhh2ukc/image/upload', formData, {
      header: {'X-Requested-With': 'XMLHttpRequest'},
    })
      .then(response => {
        const data = response.data;
        var payload = {
          data: data.url,
          userId: context.props.currentProfile.id,
        };
        axios.post('/api/user/insertpicture', payload)
          .then(response => {
            this.setState({
              picture: response.data.picture
            });
          })
          .catch(err => {
            console.log('this is the error: ', err);
          });
      });
  }

  findFriend(currProfileId, loggedInAsId) {
    if (currProfileId === loggedInAsId) {
      this.props.changeIsFriend(true);
    } else {
      let context = this;
      axios.get(`api/friends/${currProfileId}/${loggedInAsId}`).then((res) => {
        console.log('successful get for friends', res.data);
        if (res.data === false) {
          this.props.changeIsFriend(false);
        } else {
          this.props.changeIsFriend(true);
        }
      }).catch((err)=>{
        console.log('error in friend get request', err);
      });
    }
    return;
  }//Check to see if CurrentProfile is a friend or myself in order to view friends or ability to comment/post 

  render() {
    if (this.state.seeFriends) {
      return (
        <div>
          <Navbar toggleFriends ={this.seeFriends.bind(this)}/>
          <FriendList returnToProfile={this.seeFriends.bind(this)}/>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="profile">
            <div className="container">
              <div className="userName">
                {!this.props.currentProfile ? null : this.props.currentProfile.username }
              </div>
              <FriendButton />
      

              {!this.props.currentProfile ? null : 
                (!this.props.currentProfile.picture && this.props.currentProfile.id === this.props.loggedInAs.id) ? 
                  <div>
                    {this.state.picture === null ? 

                      <Dropzone 
                        onDrop={this.handleDrop.bind(this) } 
                        multiple 
                        accept="image/*" 
                      >
                        <div className="picContainer">
                          <img className="anonProfilePic" src="http://widefide.com/wp-content/uploads/2012/07/Facebook-Anonymous.jpg"/> 
                        </div>
                      </Dropzone>
                      :
                      <img onClick={ this.editPicture.bind(this) } src={this.state.picture}></img>
                    }
                  </div> 
                  :
                  !this.props.currentProfile.picture ? <div className="picContainer">
                    <img className="anonProfilePic" src="http://widefide.com/wp-content/uploads/2012/07/Facebook-Anonymous.jpg"/> </div>
                    :
                    <div className="picContainer">
                    <img className="profilePic" src={this.props.currentProfile.picture} />
                    </div>

              }


              <div className="statusForm">

              </div>

              <div>
                Current Mood : {this.state.pendingStatus}
              </div>

              <div className="viewFriendsDiv">
                {!this.props.currentProfile ? null : 
                  (this.findFriend(this.props.currentProfile.id, this.props.loggedInAs.id))} 
                { !this.props.isFriend ? null :
                  <button onClick={ this.seeFriends.bind(this) }>View Friends</button>
                }
              </div>
            </div>

            {!this.props.currentProfile ? null : <Post />}

          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = function(state) {
  return {
    currentProfile: state.currentUser,  
    loggedInAs: state.user,
    currentProfilePosts: state.currentUserPosts,
    isFriend: state.isFriend
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    changeIsFriend
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);