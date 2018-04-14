import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
// import Navbar from './Navbar.jsx';
import Dropzone from 'react-dropzone';
import Post from './post';

export class Profile extends Component { 
  constructor() {
    super();

    this.state = {
      status: '',
    };
  }

  editStatus(e) {
    console.log('this is status', this.state.status);
    console.log('this is the status', this.state.status);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setStatus() {
    console.log('this is the status click');
    var payload = {
      status: this.state.status
    };
    axios.post('/api/user/setstatus', payload)
      .then(response => {
        console.log('server replied with this button handler status: ', response);
      })
      .catch(err => {
        console.log('this is the error from server: ', err);
      });
  }



  seeFriends() {
    console.log('this is the seefriends button');
  }

  currentStatus() {
    console.log('this is the current status');
  }

  handleDrop(e) {
    console.log('this is the handle event', e)
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
      console.log('this is data', data);
      console.log('this is response', response)
      console.log('this is the uploader', uploaders)
      // this.props.currentUser
    });
    // axios.all(uploaders)
    //   .then(() => {

    //   });
  }


  render() {
    return (
      <div>
        <div>
                    {/*<Navbar/>*/}NavBar
        </div>
        <br/>
        <br/>

        <div>
          {console.log(this.props.currentProfile)}
                    <Dropzone 
                      onDrop={this.handleDrop.bind(this) } 
                      multiple 
                      accept="image/*" 
                      >
                      <p>Drop your files or click here to upload</p>
                  </Dropzone>
        </div>

        <div>
          {!this.props.currentProfile ? null: this.props.currentProfile.username }
        </div>

        <div>
          <input name='status' onChange={ this.editStatus.bind(this) } placeholder='set status..'></input>
          <button onClick={ this.setStatus.bind(this) }>SET STATUS</button>
        </div>

        <div>
                    
        </div>

        <br/>
        <br/>
        <div>
          <button onClick={ this.seeFriends.bind(this) }>SEE FRIENDS</button>
        </div>

        <Post/>  

      </div>
    );
  }
}

const mapStateToProps = function(state){
  return {
    currentProfile: state.currentUser,
    loggedInAs: state.user
  }
}

export default connect(mapStateToProps)(Profile);