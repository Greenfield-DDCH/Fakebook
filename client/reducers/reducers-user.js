export default function (state = null, action) {
  if(action.type === "LOGIN_BUTTON_CLICKED"){
    return action.payload;
  }else{
    return state;
  }
}
