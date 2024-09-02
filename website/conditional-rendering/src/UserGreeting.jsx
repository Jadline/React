import propTypes from "prop-Types"
function UserGreeting(props){
    const welcomeMessage = <h2 className="welcome-message">Welcome {props.username}</h2>
    const loginPrompt = <h2 className="login-prompt">Please login to continue</h2>
    // if(props.isLoggedIn){
    //     return <h2>Welcome {props.username}</h2>
            
    // }
    // else {
    //     return <h2>Please Log in to continue</h2>
    // }
    return (props.isLoggedIn ? welcomeMessage : loginPrompt )
    
}
userGreeting.propTypes = {
    isloggedIn : propTypes.bool,
    username : propTypes.string
  }
  userGreeting.defaultprops = {
    username : "user",
    isLoggedIn : false
  }

  
export default UserGreeting