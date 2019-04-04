import './App.scss'

import React, { Component } from 'react'

import ConsultantType from './components/consultant-type'
import AvailabilityTime from './components/date-and-type'
import Header from './components/header'
import { API_ENDPOINT } from './utility/config'
import { get } from './utility/helper'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {
        firstName: 'Florian',
        lastName: 'Gomis',
        avatar: undefined,
        dateOfBirth: '',
      },
      availableSlots: [],
      currentAppointment: {
        userId: '1',
        dateTime: '',
        notes: '',
        typeOfAppointment: 'GP',
      },
    }
  }

  retrieveAvailableSlots = () => {
    get(`${API_ENDPOINT}/availableSlots`)
      .then(result => {
        this.setState({ availableSlots: result.data })
      })
      .catch(e => {
        console.log(e)
      })
  }

  retrieveUserInformation = () => {
    get(`${API_ENDPOINT}/users/1`)
      .then(result => {
        this.setState({ currentUser: result.data })
      })
      .catch(e => {
        console.log(e)
      })
  }

  consultantTypeSelectHandler = type => {
    const state = this.state
    this.setState({
      ...state,
      currentAppointment: {
        ...state.currentAppointment,
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

  componentDidMount() {
    this.retrieveUserInformation()
    this.retrieveAvailableSlots()
  }

  render() {
    const { currentAppointment, currentUser, availableSlots } = this.state

    return (
      <div className="app-container">
        <Header currentUser={currentUser} />

        <h1> New Appointment </h1>
        <ConsultantType
          currentAppointment={currentAppointment}
          consultantTypeSelectHandler={this.consultantTypeSelectHandler}
        />

        <AvailabilityTime
          availableSlots={availableSlots}
          currentAppointmentType={currentAppointment.typeOfAppointment}
          dateTimeSelectHandler={this.dateTimeSelectHandler}
        />
      </div>
    )
  }
}

export default App
