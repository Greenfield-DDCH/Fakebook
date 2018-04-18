import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import {bindActionCreators} from 'redux';
// import Navbar from './Navbar.jsx';

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
    console.log('this is status', this.state.status);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setStatus() {
    console.log('this is the status click');
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
      seeFriends: true
    });
  }

  editPicture() {
    this.setState({
      picture: null
    });
  }

  handleDrop(e) {
    console.log('this is the handle event', e);
    var context = this;
    const formData = new FormData();
    const uploaders = e.map (file => {
      console.log('this is file', file);
      console.log('this is formData', formData);
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
            console.log('this is the responseeeeee: ', response.data.picture);
            this.setState({
              picture: response.data.picture
            });
          })

        })
        .catch(err => {
          console.log('this is the error: ', err)
        });
    });

  }

  findFriend(currProfileId, loggedInAsId) {
    if (currProfileId === loggedInAsId) {
      this.props.changeIsFriend(true);
    }else {
      console.log('checking for friend');
      let context = this;
      axios.get(`api/friends/${currProfileId}/${loggedInAsId}`).then((res) => {
        console.log('successful get for friends', res.data);
        if (res.data === false) {
          
          // this.state.isFriend = false;
          this.props.changeIsFriend(false);

        }else{
          
          // this.state.isFriend = true;
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
          see friends
        </div>
      );
    } else {
      return (
        <div>
          <br/>
          <br/>

          {!this.props.currentProfile ? null : 
            (!this.props.currentProfile.picture && this.props.currentProfile.id === this.props.loggedInAs.id) ? 
              <div>
                {this.state.picture === null ? 

                        <Dropzone 
                            onDrop={this.handleDrop.bind(this) } 
                            multiple 
                            accept="image/*" 
                            >
                            <img className="anonProfilePic" src="http://widefide.com/wp-content/uploads/2012/07/Facebook-Anonymous.jpg"/> 
                        </Dropzone>
                        :
                        <img onClick={ this.editPicture.bind(this) } src={this.state.picture}></img>
                }
              </div> 
            :
            !this.props.currentProfile.picture ? 
              <img className="anonProfilePic" src="http://widefide.com/wp-content/uploads/2012/07/Facebook-Anonymous.jpg"/> 
              :
              <img className="profilePic" src={this.props.currentProfile.picture} />

          }

          {/*<div>
            <button onClick={ this.editPicture.bind(this) }>EDIT PICTURE</button>
          </div>*/}

          <div>
            {!this.props.currentProfile ? null : this.props.currentProfile.username }
          </div>

          <div className="statusForm">
            {/* <input name='status' onChange={ this.editStatus.bind(this) } placeholder='set status..'></input>
            <button onClick={ this.setStatus.bind(this) }>SET STATUS</button> */}
          </div>

          <div>
            Current Mood : {this.state.pendingStatus}
          </div>

          <div>
                
          </div>

          <br/>
          <br/>
          <div>
            {!this.props.currentProfile ? null : 
              (this.findFriend(this.props.currentProfile.id, this.props.loggedInAs.id))} 
            { !this.props.isFriend ? null :
              <button onClick={ this.seeFriends.bind(this) }>View Friends</button>
            }
          </div>
          {!this.props.currentProfile ? null : <Post />}

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