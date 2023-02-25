import React from 'react'

class PageTitle extends React.Component{
    render(){
        return(
        <div className="page-title">
            <h1>{this.props.title}</h1>
        </div>
        )
    }
}
export default PageTitle