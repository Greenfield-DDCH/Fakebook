export default function (state = null, action) {
  if(action.type === "CHANGE_IS_FRIEND"){
    return action.payload;
  }else {
    return state;
  }
}