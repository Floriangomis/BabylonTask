import '../style/consultant-type.scss'
import '../style/shared.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { consultantType } from '../utility/helper'

class ConsultantType extends Component {
  cleanSelectedType = () => {
    const elements = document.querySelectorAll('.type .list')
    if (elements && elements.length !== 0) {
      elements.forEach(element => {
        element.classList.remove('selected')
      })
    }
  }

  selectType = (e, type) => {
    this.cleanSelectedType()
    e.target.classList.add('selected')
    this.props.consultantTypeSelectHandler(type)
  }

  render() {
    // Update this variable
    let { typeOfAppointment } = this.props.currentAppointment
    return (
      <React.Fragment>
        <div>
          <span> & </span>
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
                  className="list clickable"
                >
                  {value}
                </li>
              )
            })}
            <div className="legend">Babylon {typeOfAppointment}</div>
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
