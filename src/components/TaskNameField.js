import React from 'react'
import PropTypes from 'prop-types'

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

taskNameField.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  changeTaskName: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
}

export default taskNameField