import { expect } from 'chai'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import ReactDOM from 'react-dom'

import AppointmentType from './apppointment-type'
import { appointmentType } from '../utility/helper'

Enzyme.configure({ adapter: new Adapter() })

// Mock.
const store = {}
const classList = []
const classToAdd = 'selected'
const appointmentTypeSelectHandler = type => {
  store.appointmentType = type
}

describe('AppointmentType Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <AppointmentType
        appointmentTypeSelectHandler={appointmentTypeSelectHandler}
      />,
      div
    )
  })

  it('should update the store with the right type ( the first one in the array ) and add the right class to the clicked element', () => {
    const wrapper = Enzyme.shallow(
      <AppointmentType
        appointmentTypeSelectHandler={appointmentTypeSelectHandler}
      />
    )
    expect(store.appointmentType).to.equal(undefined)
    expect(classList).not.to.include(classToAdd)
    //We then simulate a click and check that everything is working as expected.
    wrapper
      .find('li')
      .first()
      .simulate('click', {
        target: {
          classList: {
            add: () => {
              classList.push(classToAdd)
            },
          },
        },
      })
    expect(store.appointmentType).to.equal(appointmentType[0])
    expect(classList).to.include(classToAdd)
  })
})
