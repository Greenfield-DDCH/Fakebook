import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component { 
    constructor() {
        super();

        this.state = {
            status : ''
        }
    }

    editStatus(e) {
        console.log('this is status', this.state.status)
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    //this handles the the update of the button into db
    buttonHandler() {
        console.log('this is the status', this.state.status)
        const payload = {
            status : this.state.status
        }
        axios.post('/api/user/setstatus', payload)
            .then(response => {
                console.log('server replied with this button handler status: ', response)
            })
            .catch(err => {
                console.log('this is the error from server: ', err)
            })
    }

    //finding friends
    findFriends() {
        console.log('this is the friends button')
    }

    render() {
        return (
            <div>
                

                <div>
                    <input name='status' onChange={ this.editStatus.bind(this) } placeholder='EDIT STATUS..'></input>
                    <button onClick={ this.buttonHandler.bind(this) } >EDIT STATUS</button>
                </div>
                <br/>
                <br/>

                <div>
                    <button onClick={ this.findFriends.bind(this) }>FIND FRIENDS</button>
                </div>

                

            </div>
        )
    }
}

export default Profile;