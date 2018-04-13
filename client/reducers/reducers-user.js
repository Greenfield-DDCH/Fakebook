export default function (state = {}, action) {
    console.log('inside reducer');
    console.log(action);
    console.log(state);
    switch(action.type){
      case 'LOGIN_BUTTON_CLICK':
        console.log("login button click");
        break;
      case 'SIGNUP_BUTTON_CLICK':
        console.log("sign_up");
        break;
      default:
        return state;
    }
}