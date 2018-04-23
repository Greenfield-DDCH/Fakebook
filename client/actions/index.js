export const setUser = (user) => {
  return {
    type: 'LOGIN_BUTTON_CLICKED',
    payload: user
  };
};

export const setCurrentUser = (user) => {
  return {
    type: 'SEARCH_BUTTON_CLICKED',
    payload: user
  };
};

export const changeCurrentUsersPosts = (userPosts) => {
  return{
    type: 'CHANGE_USER_POSTS',
    payload: userPosts
  };
}

export const changeIsFriend = (isFriend) => {
  return{
    type: 'CHANGE_IS_FRIEND',
    payload: isFriend
  };
}

export const getFriends = (friends) => {
  return{
    type: 'GET_FRIENDS',
    payload: friends
  };
}

export const setCurrentUsersStatus = (status) => {
  return{
    type: 'SET_CURRENT_USER_STATUS',
    payload: status
  };
}

// export const changeUploadPicture = (userPicture) => {
//   return {
//     type : 'CHANGE_PICTURE',
//     payload : userPicture
//   }
// }

export const setName = (input) => {
  const name = input;
  return {
    type: 'USER',
    payload : name
  }
}

export const setChannel = (input) => {
  return {
    type: 'SETCHANNEL',
    payload : input
  }
}

export const receiveMessage = (input) => {
  return {
    type: 'RECEIVEMESSAGE',
    payload: input
  }
}

export const type = (user) => {
  return {
    type: 'ADDTYPER',
    payload: user
  }
}

export const stopTyping = (user) => {
  return {
    type: 'REMOVETYPER',
    payload: user
  }
}