import React from 'react'

class taskNameField extends React.Component {
    
    render() {
        // var style = this.props.readOnly ? "bg: '#ff0000'" : ""
        return(
            <input style={{bg: '#ff0000'}} onChange={this.props.changeTaskName} className={this.props.className} type="text" value={this.props.name} readOnly={this.props.readOnly} />
        )
    }
}

export default taskNameField