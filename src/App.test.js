import { expect } from 'chai'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

Enzyme.configure({ adapter: new Adapter() })

// Mock
const correctData = {
  contactType: 'Audio',
  dateTime: '2019-12-01T14:16:30.000Z',
  notes: 'rew',
  typeOfAppointment: 'GP',
  userId: 1,
}

describe('AppointmentType Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  it('Should display an error message since the state of the current currentAppointment is wrong ( All undefined )', () => {
    const wrapper = Enzyme.shallow(<App />)
    wrapper.instance()._bookClickHandler()
    expect(wrapper.instance().state.formValidity.errorMessage).to.equal(
      'You must complete the form before to send it'
    )
  })

  // Here we could try to mock the post method and to update the state of the formValidity with a Validation message inside the mock to check that the validation worked.
  it('Should not display an error message because the state of the currentAppointment is correct.', () => {
    const wrapper = Enzyme.shallow(<App />)

    wrapper.instance().setState({
      ...wrapper.instance().state,
      currentAppointment: correctData,
    })
    wrapper.instance()._bookClickHandler()

    expect(wrapper.instance().state.formValidity.errorMessage).not.to.equal(
      'You must complete the form before to send it'
    )
  })
})
