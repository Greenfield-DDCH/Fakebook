export const setUser = (user) => {
  console.log('this is an action', user);
  return {
    type: "SIGNUP_BUTTON_CLICKED",
    payload: user
  }
}


