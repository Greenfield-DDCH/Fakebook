export const setUser = (user) => {
  console.log('this is the set user action', user);
  return {
    type: 'LOGIN_BUTTON_CLICKED',
    payload: user
  };
};

export const setCurrentUser = (user) => {
  console.log('this is the set current user action', user);
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

// export const changeUploadPicture = (userPicture) => {
//   return {
//     type : 'CHANGE_PICTURE',
//     payload : userPicture
//   }
// }
