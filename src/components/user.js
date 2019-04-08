import '../style/shared.scss'
import '../style/user.scss'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

class User extends Component {
  render() {
    const { currentUser } = this.props
    return (
      <div className="container">
        <div>
          {' '}
          <img src={currentUser.avatar} alt="notes logo" />{' '}
        </div>
        <div className="title-section">
          {' '}
          {currentUser.firstName} {currentUser.lastName}{' '}
        </div>
        <div className="clickable change-btn">Change</div>
      </div>
    )
  }
}

User.propTypes = {
  currentUser: PropTypes.object,
}

export default User
