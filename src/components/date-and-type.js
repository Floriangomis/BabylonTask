import '../style/consultant-type.scss'
import '../style/shared.scss'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import logo from '../assets/icon2.PNG'
import { transformDate } from '../utility/helper'

class AvailabilityTime extends Component {
  cleanSelectedDateTime = () => {
    const elements = document.querySelectorAll('.date-time .list')
    if (elements && elements.length !== 0) {
      elements.forEach(element => {
        element.classList.remove('selected')
      })
    }
  }

  selectDateTime(e, time) {
    this.cleanSelectedDateTime()
    e.target.classList.add('selected')
    this.props.dateTimeSelectHandler(time)
  }

  render() {
    const { availibilityFiltered } = this.props
    return (
      <React.Fragment>
        <div>
          <span>
            {' '}
            <img src={logo} alt="date and time logo" />{' '}
          </span>
          <span className="title-section"> Date & Time </span>
        </div>
        <div>
          <ul className="date-time">
            {availibilityFiltered.length === 0 ? (
              <div>Pick a consultant type to see any availability.</div>
            ) : (
              availibilityFiltered.map(value => {
                return (
                  <React.Fragment key={value.uuid}>
                    <li
                      className="list clickable"
                      onClick={e => {
                        this.selectDateTime(e, value.time)
                      }}
                    >
                      {transformDate(value.time)}
                    </li>
                  </React.Fragment>
                )
              })
            )}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}

AvailabilityTime.propTypes = {
  availibilityFiltered: PropTypes.array,
  dateTimeSelectHandler: PropTypes.func,
}

export default AvailabilityTime
