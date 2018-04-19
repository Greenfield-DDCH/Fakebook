export default function (state = null, action) {
  if(action.type === "GET_FRIENDS"){
    return action.payload;
  }else {
    return state;
  }
}