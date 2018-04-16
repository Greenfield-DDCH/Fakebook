export default function (state = null, action) {
  if(action.type === "CHANGE_USER_POSTS"){
    return action.payload;
  }else {
    return state;
  }
}