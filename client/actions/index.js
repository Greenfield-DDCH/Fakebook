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
