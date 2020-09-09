import React from 'react'
import { Form, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { asideMenu, asideMenuAdmin } from 'common/helpers/const'

export default class Aside extends React.Component {
  render () {
    const { profile } = this.props

    const currentLink = window.location.pathname

    return (
      <div className='col-xl-2 col-md-3 col-12 d-flex flex-column sidebar'>
        <Form className='py-3 d-flex align-items-center'>
          <Form.Control placeholder='Search...' />
        </Form>
        <div className='listmenu'>
          <Nav className='nav-list pt-2 pb-4'>
            <div className='title-nav'> Member </div>
            {asideMenu.map((item, i) => {
              return (
                <Link
                  key={i}
                  className={currentLink === item.link ? 'active nav-link' : 'nav-link'}
                  to={item.link}
                >
                  <i className={`fa ${item.icon}`} aria-hidden='true' /> {item.name}
                </Link>
              )
            })}
            {profile && profile.role === 'admin' &&
            <>
              <div className='title-nav'>
              Admin
              </div>
              {asideMenuAdmin.map((item, i) => {
                return (
                  <Link
                    key={i}
                    className={currentLink === item.link ? 'active nav-link' : 'nav-link'}
                    to={item.link}
                  >
                    <i className={`fa ${item.icon}`} aria-hidden='true' /> {item.name}
                  </Link>
                )
              })}
            </>
            }
          </Nav>

        </div>
      </div>
    )
  }
}
