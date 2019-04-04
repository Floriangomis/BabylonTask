import '../style/consultant-type.scss'
import '../style/shared.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { transformDate } from '../utility/helper'

class AvailabilityTime extends Component {
  availibilityFiltered = []

  componentDidMount() {}

  cleanSelectedDateTime = () => {
    const elements = document.querySelectorAll('.date-time .list')
    if (elements && elements.length !== 0) {
      elements.forEach(element => {
        element.classList.remove('selected')
      })
    }
  }

  updateAvailability() {
    const { availableSlots, currentAppointmentType } = this.props

    this.availibilityFiltered = availableSlots.filter(slotType => {
      return (
        slotType.consultantType.indexOf(
          currentAppointmentType.toLowerCase()
        ) !== -1
      )
    })
  }

  selectDateTime(e, time) {
    this.cleanSelectedDateTime()
    e.target.classList.add('selected')
    this.props.dateTimeSelectHandler(time)
  }

  render() {
    this.updateAvailability()
    return (
      <React.Fragment>
        <div>
          <span> & </span>
          <span className="title-section"> Date & Time </span>
        </div>
        <div>
          <ul className="date-time">
            {this.availibilityFiltered.map((value, index) => {
              return (
                <React.Fragment key={index}>
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
            })}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}

AvailabilityTime.propTypes = {
  availableSlots: PropTypes.array,
  currentAppointmentType: PropTypes.string,
  dateTimeSelectHandler: PropTypes.func,
}

export default AvailabilityTime
