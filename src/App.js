import './App.scss'
import './style/shared.scss'

import React, { Component } from 'react'
import uuid from 'uuid'

import AppointmentType from './components/apppointment-type'
import ConsultantType from './components/consultant-type'
import AvailabilityTime from './components/date-and-type'
import Header from './components/header'
import Notes from './components/notes'
import User from './components/user'

import { API_ENDPOINT } from './utility/config'
import { get, post } from './utility/helper'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formValidity: {
        errorMessage: undefined,
        confirmationMessage: undefined,
      },
      currentUser: {
        firstName: undefined,
        lastName: undefined,
        avatar: undefined,
        dateOfBirth: undefined,
      },
      availableSlots: [],
      availibilityFiltered: [],
      currentAppointment: {
        userId: undefined,
        dateTime: undefined,
        notes: undefined,
        typeOfAppointment: undefined,
        contactType: undefined,
      },
    }
  }

  componentDidMount() {
    this._retrieveUserInformation()
    this._retrieveAvailableSlots()
  }

  // Function called everytime a user pick a new type of consultant.
  // It update the state and trigger another function which will update the available slot for this type.
  consultantTypeSelectHandler = type => {
    const state = this.state
    const filteredSlots = this._sortNewAvailability(type)

    this.setState({
      ...state,
      availibilityFiltered: filteredSlots,
      currentAppointment: {
        ...state.currentAppointment,
        // Allow us to reset the datetime to be sure that we don't send incorrect date.
        // ( In the case you select a date time and then you switch the type of the appointment.)
        dateTime: undefined,
        typeOfAppointment: type,
      },
    })
  }

  dateTimeSelectHandler = time => {
    const state = this.state
    this.setState({
      ...state,
      currentAppointment: {
        ...state.currentAppointment,
        dateTime: time,
      },
    })
  }

  appointmentTypeSelectHandler = type => {
    const state = this.state
    this.setState({
      ...state,
      currentAppointment: {
        ...state.currentAppointment,
        contactType: type,
      },
    })
  }

  notesInputHandler = notes => {
    const state = this.state
    this.setState({
      ...state,
      currentAppointment: {
        ...state.currentAppointment,
        notes: notes,
      },
    })
  }

  _bookClickHandler = () => {
    const state = this.state

    this._resetFormValidityMessage()

    if (
      state.currentAppointment.userId &&
      state.currentAppointment.dateTime &&
      state.currentAppointment.notes &&
      state.currentAppointment.typeOfAppointment &&
      state.currentAppointment.contactType
    ) {
      return post(`${API_ENDPOINT}/appointments`, state.currentAppointment)
        .then(result => {
          this.setState({
            ...state,
            formValidity: {
              confirmationMessage: 'Data Sent. Thank you.',
            },
          })
        })
        .catch(e => {
          console.error(e)
        })
    }

    this.setState({
      ...state,
      formValidity: {
        errorMessage: 'You must complete the form before to send it',
      },
    })
  }

  _resetFormValidityMessage = () => {
    const state = this.state
    this.setState({ ...state, formValidity: {} })
  }

  _retrieveAvailableSlots = () => {
    get(`${API_ENDPOINT}/availableSlots`)
      .then(result => {
        this.setState({ availableSlots: result.data })
      })
      .catch(e => {
        console.log(e)
      })
  }

  _retrieveUserInformation = () => {
    const state = this.state
    get(`${API_ENDPOINT}/users/1`)
      .then(result => {
        this.setState({
          currentUser: result.data,
          currentAppointment: {
            ...state.currentAppointment,
            userId: result.data.id,
          },
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  _sortNewAvailability = type => {
    const tmpAvailableSlots = this.state.availableSlots
    return (
      tmpAvailableSlots
        .filter(slotType => {
          return slotType.consultantType.indexOf(type.toLowerCase()) !== -1
        })
        // Quick trick to be able to re-render the Date&Time list without keeping the previous selection of a user.
        // without this, If you first select GP and then the first time available (Index 0). If you then select Specialist
        // the first item in the list will still look like it is selected ( even though the state is correct ).
        .map(slot => {
          slot.uuid = uuid.v4()
          return slot
        })
    )
  }

  render() {
    const {
      currentAppointment,
      currentUser,
      availibilityFiltered,
      formValidity,
    } = this.state

    return (
      <div className="app-container">
        <Header currentUser={currentUser} />

        <h1> New Appointment </h1>
        <User currentUser={currentUser} />

        <ConsultantType
          currentAppointment={currentAppointment}
          consultantTypeSelectHandler={this.consultantTypeSelectHandler}
        />

        <AvailabilityTime
          availibilityFiltered={availibilityFiltered}
          dateTimeSelectHandler={this.dateTimeSelectHandler}
        />

        <AppointmentType
          appointmentTypeSelectHandler={this.appointmentTypeSelectHandler}
        />

        <Notes notesInputHandler={this.notesInputHandler} />

        <div className="separator" />

        <div
          className="clickable book-btn"
          onClick={() => {
            this._bookClickHandler()
          }}
        >
          Book
        </div>

        {/* TODO : Move this logic inside a new component */}
        <div className="validation-msg">
          {formValidity.errorMessage ? (
            <span className="error-msg">{formValidity.errorMessage}</span>
          ) : (
            undefined
          )}

          {formValidity.confirmationMessage ? (
            <span className="validation-msg">
              {formValidity.confirmationMessage}
            </span>
          ) : (
            undefined
          )}
        </div>
        {/* End TODO */}
      </div>
    )
  }
}

export default App
