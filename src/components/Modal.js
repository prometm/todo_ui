import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Calendar from './calendar/index.js'

const styles = {
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
  },
  calrndarContainer: {
    background: '#ffffff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '45%',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
}


const Modal = ({ modalIsVisible, hideModal, changeTaskDeadline, deadline }) => {
  const changeVisibility = () => {
    hideModal()
  }

  const setTaskDeadline = (date) => {
    let dateString
    if (date === 'null') {
      dateString = date
    } else {
      dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
    changeTaskDeadline(dateString)
  } 

  return(
    <Fragment>
    { modalIsVisible &&
      <div style={styles.modal}>
          <div style={styles.calrndarContainer}>
              <Calendar setDate={setTaskDeadline} deadline={deadline} />
              <input type='button' onClick={() => setTaskDeadline('null')} value='Delete Deadline' />
              <input type='button' onClick={changeVisibility} value='Cancel' />
          </div>
      </div>
    }
    </Fragment>
  )
}

Modal.propTypes = {
  modalIsVisible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  changeTaskDeadline: PropTypes.func.isRequired,
  deadline: PropTypes.string,
}

export default Modal;