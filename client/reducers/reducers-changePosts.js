export default function (state = null, action) {
  if(action.type === "CHANGE_USER_POSTS"){
    // console.log("inside reducer", action.payload);
    return action.payload;
  }else {
    return state;
  }
}