import '../style/shared.scss'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import logo from '../assets/icon3.PNG'
import { appointmentType } from '../utility/helper'

class AppointmentType extends Component {
  cleanAppointmentTypeSelected = () => {
    const elements = document.querySelectorAll('.type-appointment .list')
    if (elements && elements.length !== 0) {
      elements.forEach(element => {
        element.classList.remove('selected')
      })
    }
  }

  selectAppointmentType(e, type) {
    this.cleanAppointmentTypeSelected()
    e.target.classList.add('selected')
    this.props.appointmentTypeSelectHandler(type)
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <span>
            {' '}
            <img src={logo} alt="appointment logo" />{' '}
          </span>
          <span className="title-section"> Appointment Type </span>
        </div>
        <div>
          <ul className="type-appointment">
            {appointmentType.map((type, index) => {
              return (
                <React.Fragment key={index}>
                  <li
                    className="list clickable"
                    onClick={e => {
                      this.selectAppointmentType(e, type)
                    }}
                  >
                    {type}
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

AppointmentType.propTypes = {
  appointmentTypeSelectHandler: PropTypes.func,
}

export default AppointmentType
