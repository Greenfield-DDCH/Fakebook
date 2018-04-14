export default function (state = null, action) {
    if(action.type === "SEARCH_BUTTON_CLICKED"){
      return action.payload;
    }else {
      return state;
    }
}