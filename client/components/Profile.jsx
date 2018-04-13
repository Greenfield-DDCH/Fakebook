import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component { 
    constructor() {
        super();

        this.state = {
            status : '',
        }
    }

    editStatus(e) {
        console.log('this is status', this.state.status)
        console.log('this is the status', this.state.status)
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    setStatus() {
        console.log('this is the status click')
        var payload = {
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



    seeFriends() {
        console.log('this is the seefriends button')
    }

    currentStatus() {
        console.log('this is the current status')
    }
    

    render() {
        return (
            <div>
                <div>
                    NAV BAR
                </div>
                <br/>
                <br/>

                <div>
                    PLACE PICTURE HERE
                </div>

                <div>
                    USERNAME: 
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

                

            </div>
        )
    }
}

export default Profile;