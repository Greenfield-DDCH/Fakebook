export const setUser = (user) => {
  console.log('this is thie set user action', user);
  return {
    type: 'SIGNUP_BUTTON_CLICKED',
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


