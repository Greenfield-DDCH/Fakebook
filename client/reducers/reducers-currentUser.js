export default function (state = null, action) {
    if(action.type === "SEARCH_BUTTON_CLICKED"){
      console.log("inside reducer", action.payload);
      return action.payload;
    }else {
      return state;
    }
}