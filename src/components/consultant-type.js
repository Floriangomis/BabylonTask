import '../style/consultant-type.scss'
import '../style/shared.scss'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import logo from '../assets/icon1.PNG'
import { consultantType } from '../utility/helper'

class ConsultantType extends Component {
  // Allow us to clean the UI before to select one type.
  cleanSelectedType = () => {
    const elements = document.querySelectorAll('.type .list')
    if (elements && elements.length !== 0) {
      elements.forEach(element => {
        element.classList.remove('selected')
      })
    }
  }

  // Select Type handler.
  selectType = (e, type) => {
    this.cleanSelectedType()
    e.target.classList.add('selected')
    this.props.consultantTypeSelectHandler(type)
  }

  // Function which allow us to select by default the first Type of consultant when we load the SPA.
  getClassName = index => {
    return `list clickable`
  }

  render() {
    // Update this variable
    let { typeOfAppointment } = this.props.currentAppointment
    return (
      <React.Fragment>
        <div>
          <span>
            {' '}
            <img src={logo} alt="consultant type logo" />{' '}
          </span>
          <span className="title-section"> Consultant Type </span>
        </div>
        <div>
          <ul className="type">
            {consultantType.map((value, index) => {
              return (
                <li
                  key={index}
                  onClick={e => {
                    this.selectType(e, value)
                  }}
                  className={this.getClassName(index)}
                >
                  {value}
                </li>
              )
            })}
            {/* Display Only if on consultant type is selected. */}
            {typeOfAppointment ? (
              <div className="legend">Babylon {typeOfAppointment}</div>
            ) : (
              undefined
            )}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}

ConsultantType.propTypes = {
  currentAppointment: PropTypes.object,
  typeOfAppointment: PropTypes.string,
  consultantTypeSelectHandler: PropTypes.func,
  AvailabilityTime: PropTypes.array,
}

export default ConsultantType
