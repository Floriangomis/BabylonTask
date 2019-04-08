import { expect } from 'chai'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import ReactDOM from 'react-dom'

import ConsultantType from './consultant-type'
import { consultantType } from '../utility/helper'

Enzyme.configure({ adapter: new Adapter() })

// Mock.
const store = {}
const classList = []
const classToAdd = 'selected'
const mockkConsultantTypeSelectHandler = type => {
  store.type = type
}

const mockData = {
  contactType: 'Audio',
  dateTime: '2019-12-01T14:16:30.000Z',
  notes: 'rew',
  typeOfAppointment: 'GP',
  userId: 1,
}

describe('ConsultantType Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ConsultantType currentAppointment={mockData} />, div)
  })

  it('should update the store with the right type and add the right class to the clicked element', () => {
    const wrapper = Enzyme.shallow(
      <ConsultantType
        currentAppointment={mockData}
        consultantTypeSelectHandler={mockkConsultantTypeSelectHandler}
      />
    )
    expect(store.type).to.equal(undefined)
    expect(classList).not.to.include(classToAdd)
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
    expect(store.type).to.equal(consultantType[consultantType.length - 1])
    expect(classList).to.include(classToAdd)
  })
})
