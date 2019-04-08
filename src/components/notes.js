import '../style/notes.scss'
import '../style/shared.scss'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import logo from '../assets/icon4.PNG'

class Notes extends Component {
  inputHandler = e => {
    const notes = e.target.value
    this.props.notesInputHandler(notes)
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <span>
            {' '}
            <img src={logo} alt="notes logo" />{' '}
          </span>
          <span className="title-section"> Notes </span>
        </div>
        <div>
          <textarea
            placeholder="Describe your symptoms"
            rows="6"
            cols="60"
            onChange={e => {
              this.inputHandler(e)
            }}
          />
        </div>
      </React.Fragment>
    )
  }
}

Notes.propTypes = {
  notesInputHandler: PropTypes.func,
}

export default Notes
