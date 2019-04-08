import { expect } from 'chai'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import ReactDOM from 'react-dom'

import Notes from './notes'

Enzyme.configure({ adapter: new Adapter() })

// Mock.
const store = {}
const notesInputHandler = text => {
  store.text = text
}
const inputText = 'Test Text.'

describe('AppointmentType Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Notes notesInputHandler={notesInputHandler} />, div)
  })

  it('should update the store with the right text from the textArea', () => {
    const wrapper = Enzyme.shallow(
      <Notes notesInputHandler={notesInputHandler} />
    )
    expect(store.text).to.equal(undefined)

    //We then simulate a click and check that everything is working as expected.
    wrapper
      .find('textarea')
      .first()
      .simulate('change', {
        target: {
          value: inputText,
        },
      })
    expect(store.text).to.equal(inputText)

    wrapper
      .find('textarea')
      .first()
      .simulate('change', {
        target: {
          value: inputText + " And let's add this to be sure",
        },
      })

    expect(store.text).to.equal(inputText + " And let's add this to be sure")
  })
})
