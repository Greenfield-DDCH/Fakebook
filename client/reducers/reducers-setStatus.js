export default function (state = null, action) {
  if(action.type === "SET_CURRENT_USER_STATUS"){
    console.log(action.payload);
    return action.payload
  }else {
    return state;
  }
}