export default function (state = null, action) {
  if(action.type === "LOGIN_BUTTON_CLICKED"){
    return action.payload;
  }else{
    return state;
  }
}

// return [{
//   id: 'a1b23',
//   username: 'dave dave',
//   status: 'im sad',
//   picture: 'url of a pic'
// }]