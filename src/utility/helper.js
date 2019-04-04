import Axios from 'axios'
import moment from 'moment'

export const consultantType = ['GP', 'Specialist', 'Therapist']

export const appointmentType = ['Video', 'Audio']

export const returnInitialFromName = (firstName, lastName) => {
  if (firstName && lastName) {
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
  }
}

export const post = (url, data, config = undefined) => {
  return Axios.post(url, data, config)
}

export const get = (url, config = undefined) => {
  return Axios.get(url, config)
}

export const transformDate = dateTime => {
  return moment(dateTime).format('MMMM Do YYYY, h:mm:ss a')
}
