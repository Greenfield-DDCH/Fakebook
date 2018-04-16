import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
// import Navbar from './Navbar.jsx';
import Dropzone from 'react-dropzone';

import Post from './post';
import {setCurrentUser, setUser, changeCurrentUsersPosts} from '../actions/index.js';

export class Profile extends Component { 
  constructor(props) {
    super(props);

   this.state = {
      status: '',
      pendingStatus: '',
      picture : null,
      posts: this.props.currentProfilePosts

    };
  }

  componentWillReceiveProps(nextProps){
    // console.log("UPDATED********");
    // console.log(nextProps);
    // this.setState({ posts: nextProps.currentProfilePosts});
  }

  editStatus(e) {
    console.log('this is status', this.state.status);
    // console.log('this is the status', this.state.status);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setStatus() {
    console.log('this is the status click');
    var payload = {
      status: this.state.status,
      userId : this.props.currentProfile.id
    };
    const config = {
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    }
    axios.post('/api/user/setstatus', payload, config)
      .then(response => {
        console.log('server replied with this button handler status: ', response);
        this.setState({
          pendingStatus : response.data.status
        })
      })
      .catch(err => {
        console.log('this is the error from server: ', err);
      });
  }


  seeFriends() {
    console.log('this is the seefriends button');
  }

  editPicture() {
    this.setState({
      picture : null
    })
  }


  handleDrop(e) {
    console.log('this is the handle event', e)
    var context = this;
    const formData = new FormData()
    const uploaders = e.map (file => {
      console.log('this is file', file)
      console.log('this is formData', formData)
      formData.append('file', file);
      // formData.append("tags", `dtfhh2ukc, medium, gist`);
      formData.append("upload_preset", "ed9m3yng");
      formData.append("api_key", "887545849876627");
      formData.append("timestamp", (Date.now() / 1000) | 0);
    })
    axios.post('https://api.cloudinary.com/v1_1/dtfhh2ukc/image/upload', formData, {
      header: {"X-Requested-With": "XMLHttpRequest"},
    })
    .then(response => {
      const data = response.data;
      var payload = {
        data : data.url,
        userId : context.props.currentProfile.id,
      }
      // console.log('this is payload', payload)
      // console.log('this is data url', {url : data.url});
      // console.log('this is response', response);
      // console.log('this is the uploader', uploaders)
      // console.log('this is props', context.props.currentProfile)
      axios.post('/api/user/insertpicture', payload)
        .then(response => {
          console.log('this is the responseeeeee: ', response.data.picture)
          this.setState({
            picture : response.data.picture
          })
        })
        .catch(err => {
          console.log('this is the error: ', err)
        })
    });
    // axios.all(uploaders)
    //   .then(() => {

    //   });
  }


  render() {
    return (
      <div>
        <br/>
        <br/>

        <div>
          {this.state.picture === null ? 
                  <Dropzone 
                      onDrop={this.handleDrop.bind(this) } 
                      multiple 
                      accept="image/*" 
                      >
                      <p>Drop your files or click here to upload</p>
                  </Dropzone>
                  :
                  <img onClick={ this.editPicture.bind(this) } src={this.state.picture}></img>
          }
        </div>

        {/*<div>
          <button onClick={ this.editPicture.bind(this) }>EDIT PICTURE</button>
        </div>*/}

        <div>
          {!this.props.currentProfile ? null: this.props.currentProfile.username }
        </div>

        <div>
          <input name='status' onChange={ this.editStatus.bind(this) } placeholder='set status..'></input>
          <button onClick={ this.setStatus.bind(this) }>SET STATUS</button>
        </div>

        <div>
          Current Mood : {this.state.pendingStatus}
        </div>

        <div>
              
        </div>

        <br/>
        <br/>
        <div>
          <button onClick={ this.seeFriends.bind(this) }>SEE FRIENDS</button>
        </div>
        {console.log("inside profile",this.props.currentProfilePosts)}
        {!this.props.currentProfile ? null: <Post />}

      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    currentProfile: state.currentUser,
    loggedInAs: state.user,
    currentProfilePosts: state.currentUserPosts
  }
}

// function matchDispatchToProps(dispatch) {
//   return bindActionCreators({
//     setCurrentUser,
//     setUser,
//     changeCurrentUsersPosts,

//   }, dispatch);
// }

export default connect(mapStateToProps)(Profile);