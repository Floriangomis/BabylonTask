import { expect } from 'chai'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import ReactDOM from 'react-dom'

import AvailabilityTime from './date-and-type'
import { appointmentType } from '../utility/helper'

Enzyme.configure({ adapter: new Adapter() })

// Mock.
const store = {}
const classList = []
const classToAdd = 'selected'
const dateTimeSelectHandler = time => {
  store.dateTime = time
}
const mockFilteredAvailabilityGp = [
  {
    appointmentType: ['Audio', 'Video'],
    consultantType: ['Gp'],
    id: 1,
    time: '2019-11-27T10:11:00.000Z',
    uuid: '78f3e06a-1f04-4d03-99aa-2879ef4c31e8',
  },
  {
    appointmentType: ['Audio', 'Video'],
    consultantType: ['Gp'],
    id: 2,
    time: '2019-11-27T10:11:10.000Z',
    uuid: '78f3e06a-1f04-4d03-99aa-2879ef4c34d2',
  },
  {
    appointmentType: ['Audio', 'Video'],
    consultantType: ['Gp'],
    id: 3,
    time: '2019-11-27T10:11:20.000Z',
    uuid: '78f3e06a-1f04-4d03-99aa-2879ef4c38e6',
  },
]

const mockFilteredAvailabilitySpecialist = [
  {
    appointmentType: ['Audio', 'Video'],
    consultantType: ['Specialist'],
    id: 1,
    time: '2019-11-27T10:11:00.100Z',
    uuid: '78f3e06a-1f04-4d03-99aa-2879ef444444',
  },
]

describe('AvailabilityTime Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <AvailabilityTime
        availibilityFiltered={mockFilteredAvailabilityGp}
        dateTimeSelectHandler={dateTimeSelectHandler}
      />,
      div
    )
  })

  it('should display 3 available slot', () => {
    const wrapper = Enzyme.shallow(
      <AvailabilityTime
        availibilityFiltered={mockFilteredAvailabilityGp}
        dateTimeSelectHandler={dateTimeSelectHandler}
      />
    )
    //We then simulate a click and check that everything is working as expected.
    expect(wrapper.find('li').length).to.equal(
      mockFilteredAvailabilityGp.length
    )
  })

  it('should display 1 available slot after changing the filtered availability props', () => {
    const wrapper = Enzyme.shallow(
      <AvailabilityTime
        availibilityFiltered={mockFilteredAvailabilityGp}
        dateTimeSelectHandler={dateTimeSelectHandler}
      />
    )
    // it should display 3 items there
    expect(wrapper.find('li').length).to.equal(
      mockFilteredAvailabilityGp.length
    )
    // We update the props here ( as it should happen when you change the type of consultant )
    wrapper.setProps({
      availibilityFiltered: mockFilteredAvailabilitySpecialist,
    })
    // it should display 1 items there
    expect(wrapper.find('li').length).to.equal(
      mockFilteredAvailabilitySpecialist.length
    )
  })

  it('should update the store with the right type ( the first one in the array ) and add the right class to the clicked element', () => {
    const wrapper = Enzyme.shallow(
      <AvailabilityTime
        availibilityFiltered={mockFilteredAvailabilityGp}
        dateTimeSelectHandler={dateTimeSelectHandler}
      />
    )
    expect(store.dateTime).to.equal(undefined)
    expect(classList).not.to.include(classToAdd)

    //We then simulate a click and check that everything is working as expected.
    wrapper
      .find('li')
      .last()
      .simulate('click', {
        target: {
          classList: {
            add: () => {
              classList.push(classToAdd)
            },
          },
        },
      })
    expect(store.dateTime).to.equal(
      mockFilteredAvailabilityGp[mockFilteredAvailabilityGp.length - 1].time
    )
    expect(classList).to.include(classToAdd)
  })
})
