import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import {bindActionCreators} from 'redux';
import {Button} from 'semantic-ui-react';

import FriendButton from './FriendButton';
import Navbar from './Navbar';
import FriendList from './FriendList';
import Post from './post';
import {changeIsFriend, setCurrentUsersStatus} from '../actions/index.js';

export class Profile extends Component { 
  constructor(props) {
    super(props);

    //console.log(this.props.status);
    this.state = {
      textAreaStatus: '',
      pendingStatus: this.props.status,
      picture: null,
      posts: this.props.currentProfilePosts,
      seeFriends: false
      // isFriend : true
    };
  }

  componentDidMount() {
  }

  onChangeStatusText(e) {
    this.setState({
      textAreaStatus: e.target.value
    });
  }

  setStatus() {
    const payload = {
      status: this.state.textAreaStatus,
      userId: this.props.currentProfile.id
    };

    // const config = {
    //   headers: {
    //     authorization: sessionStorage.getItem('token')
    //   }
    // };

    const context = this;
    axios.post('/api/user/setstatus', payload)
      .then(response => {
        console.log('server replied with this button handler status: ', response);

        context.props.setCurrentUsersStatus(response.data.status);
        // this.setState({
        //   pendingStatus: response.data.status
        // });
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
        <div >
          <Navbar />
          <div className="profile">
            <div className="container">
              <div className="userName">
                {!this.props.currentProfile ? null : this.props.currentProfile.username }
              </div>

              <FriendButton />
      
              {!this.props.currentProfile ? null : 
                (!this.props.currentProfile.picture && this.props.currentProfile.id === this.props.loggedInAs.id) ? 
                  <div className="dropZone">
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
                      <div className="picContainer">
                        <img className="profilePic" onClick={ this.editPicture.bind(this) } src={this.state.picture}></img>
                      </div>
                    }
                  </div> 
                  :
                  !this.props.currentProfile.picture ? <div className="picContainer">
                    <img className="anonProfilePic" src="http://widefide.com/wp-content/uploads/2012/07/Facebook-Anonymous.jpg"/> </div>
                    :
                    <div className="picContainer">
                      <img className="profilePic" onClick={ this.editPicture.bind(this) } src={this.props.currentProfile.picture} />
                    </div>

              }

              {/* {console.log(this.state.pendingStatus)} */}
              <div>
                Current Mood : {!this.props.status ? null : this.props.status}
              </div>

                {!this.props.currentProfile ? null : this.props.currentProfile.id === this.props.loggedInAs.id ? 
                  <div className="statusForm">
                    <textarea value={this.state.statusText} name="statusText" placeholder="Write a status..." onChange={this.onChangeStatusText.bind(this)}/>
                    <Button color='blue' className="editStatus" onClick={this.setStatus.bind(this)}>Set Status </Button>
                  </div> 
                  : 
                  null
                }

              <div className="viewFriendsDiv">
                {!this.props.currentProfile ? null : 
                  (this.findFriend(this.props.currentProfile.id, this.props.loggedInAs.id))} 
                { !this.props.isFriend ? null :
                  <Button color='blue' onClick={ this.seeFriends.bind(this) }>View Friends</Button>
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
    isFriend: state.isFriend,
    status: state.status
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    changeIsFriend,
    setCurrentUsersStatus
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);