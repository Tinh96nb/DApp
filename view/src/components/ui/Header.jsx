import React, { Component } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import * as session from 'common/helpers/session'
export default class Header extends Component {
  handleLogout () {
    session.remove()
    window.location.href = '/auth'
  }

  convertTextAddress (address) {
    const text = `${address.substring(0, 4)}...${address.substring(address.length - 3, address.length)}`
    return text
  }

  render () {
    const { profile, loading } = this.props

    return (
      <Navbar bg='dark' variant='dark' className='header'>
        <a href='/' className='navbar-brand'>
          Document Manager Blockchain
        </a>
        <Nav className='mr-auto' />
        {loading !== 0 ? (<div className='spinner-border text-primary' />) : null}
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text className='ml-auto pr-md-5 navbar-nav'>
            Signed in as: <a href='/profile'>
              {profile && this.convertTextAddress(profile.address)}
            </a>{' '}
            <Button
              variant='outline-light'
              size='sm'
              onClick={this.handleLogout}
              title='Logout'
            >
              <i className='fa fa-sign-out' aria-hidden='true' />
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
