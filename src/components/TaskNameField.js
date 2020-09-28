import React from 'react'

const taskNameField = (props) => {
    var style = props.readOnly ? {} : {color: '#ff0000'}
    return(
        <input
        	style={style}
        	onChange={props.changeTaskName}
        	className={props.className}
        	type="text"
        	value={props.name}
        	readOnly={props.readOnly}
    	/>
    )
}

export default taskNameField