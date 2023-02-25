import React from "react";
import PageTitle from './../gen/PageTitle';

class ErrorPage extends React.Component {
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
          <div>
            <PageTitle title="Page Not Found!"></PageTitle>
          </div>
        );
    }
}
export default ErrorPage;