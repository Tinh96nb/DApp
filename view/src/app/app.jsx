import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { deleteAxiosError } from './apiReducer'
import { connect } from 'react-redux'
import { Gateway, GatewayDest, GatewayProvider } from 'react-gateway'
import { get } from 'common/helpers/session'
import CheckWeb3 from 'common/helpers/checkWeb3'
import SweetAlert from 'react-bootstrap-sweetalert'

import Header from 'components/ui/Header'
import SideBar from 'components/ui/SideBar'
import RightSideBar from 'components/ui/RightSideBar'

import { postLogin, getUserMe } from './appReducer'
import { fetchListCategory } from './admin/reducer'

import Home from './home/containers/Home'
import DocumentList from './document/containers/DocList'
import DocumentDetail from './document/containers/DocDetail'
import Member from './member/containers/Member'
import Profile from './profile/containers/Profile'

import CategoryManager from './admin/containers/Category'
import DocManager from './admin/containers/Document'
import MemManager from './admin/containers/Member'

export class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      alertError: false
    }
    this.confirmError = this.confirmError.bind(this)
  }

  componentDidMount () {
    const token = get()
    if (!token) {
      return
    }
    this.props.getUserMe()
    if (!this.props.categories.length) {
      this.props.getListCategory()
    }
  }

  confirmError () {
    this.props.deleteAxiosError()
    this.setState({
      alertError: false
    })
  }

  componentWillReceiveProps (props) {
    const { error } = props.api
    if (error) {
      this.setState({
        alertError: true
      })
    }
  }

  render () {
    const { profile, api } = this.props
    return (
      <GatewayProvider>
        <Fragment>
          <CheckWeb3
            postLogin={this.props.postLogin}
            profile={profile}
          >
            <Header profile={profile} loading={api.loadings} />
            <div className='container-fluid'>
              <div className='flex-xl-nowrap row'>
                {profile
                  ? <Router>
                    <Fragment>
                      <SideBar profile={profile} />
                      <RightSideBar categories={this.props.categories} />
                      <div className='main col-xl-8 col-md-9 col-12'>
                        <Switch>
                          <Route path='/' exact component={Home} />
                          <Route path='/document/:id' component={DocumentDetail} />
                          <Route path='/document' component={DocumentList} />
                          <Route path='/member' component={Member} />
                          <Route path='/profile' component={Profile} />
                          {profile && profile.role === 'admin'
                            ? <Fragment>
                              <Route path='/admin/category' component={CategoryManager} />
                              <Route path='/admin/document' component={DocManager} />
                              <Route path='/admin/member' component={MemManager} />
                            </Fragment>
                            : null
                          }
                          <Route component={() => (<p>Not Found</p>)} />
                        </Switch>
                      </div>
                    </Fragment>
                  </Router>
                  : null
                }
              </div>
            </div>
          </CheckWeb3>
          <GatewayDest name='confirm' />

          {this.state.alertError && (
            <Gateway into='confirm'>
              <SweetAlert
                error
                style={{ whiteSpace: 'pre-swap' }}
                title='Error'
                html
                onConfirm={this.confirmError}
                onCancel={this.confirmError}
              >
                {this.props.api.error.message}
              </SweetAlert>
            </Gateway>
          )}
        </Fragment>
      </GatewayProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    api: state.api,
    profile: state.app.me,
    categories: state.admin.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAxiosError: () => dispatch(deleteAxiosError()),
    postLogin: (params, cb) => dispatch(postLogin(params, cb)),
    getUserMe: (params) => dispatch(getUserMe(params)),
    getListCategory: (params) => dispatch(fetchListCategory(params))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
