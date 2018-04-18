import React, {Component} from 'react';
import {connect} from 'react-redux';

export class FriendPage extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="friendPage">
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentProfile: state.currentUser,
    user: state.user
  };
};

export default connect(mapStateToProps)(FriendPage);