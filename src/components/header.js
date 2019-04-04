import '../style/header.scss'
import '../style/shared.scss'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { returnInitialFromName } from '../utility/helper'
import logo from './../logo.png'

class Header extends Component {
  componentDidMount() {}

  render() {
    const { lastName, firstName } = this.props.currentUser
    return (
      <React.Fragment>
        <div className="header">
          <div className="menu clickable">Menu</div>
          <img src={logo} className="logo" alt="Babylon Health" />
          <div className="user clickable">
            {returnInitialFromName(firstName, lastName)}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Header.propTypes = {
  currentUser: PropTypes.object,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
}

export default Header
