import React from "react";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      testState: "initialState"
    }
  }
  handleClick(){
    this.setState({
      testState: "newState"
    })
  }
    render() {
        return (
          <div>Login</div>
        );
    }
}
export default Login;