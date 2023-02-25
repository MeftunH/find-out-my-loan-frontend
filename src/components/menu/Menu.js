import React from "react";

class Menu extends React.Component {
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
          <div>Menu</div>
        );
    }
}
export default Menu;