import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchDocument,
  crateDocument,
  deleteDocument,
  updateDocument,
  updateStatus
} from '../reducer'
import { getUserMe } from 'app/appReducer'

import { Button, Card, Badge } from 'react-bootstrap'

import ModalAdd from '../components/ModalAdd'
import ModalEdit from '../components/ModalEdit'
import ListDoc from '../components/ListDocument'

class DocContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModalAdd: false,
      isShowModalUpdate: false,
      docSelecting: null
    }
  }

  componentWillMount () {
    this.props.getUserMe()
    this.props.fetchDocument({ owner: this.props.me.address })
  }
  render () {
    const { me } = this.props
    return (
      <div>
        <Card>
          <Card.Header><h5 className='pull-left'>Profile</h5></Card.Header>
          {me &&
            <Card.Body>
              <ul>
                <li>
                  <div className='title'>
                    <i className='fa fa-address-card' aria-hidden='true' /><span>Address</span>
                  </div>
                  {me.address}
                </li>
                <li>
                  <div className='title'>
                    <i className='fa fa-money' aria-hidden='true' /><span>Balance</span>
                  </div>
                  {me.balance} ether
                </li>
                <li>
                  <div className='title'>
                    <i className='fa fa-file' aria-hidden='true' /><span>Document</span>
                  </div>
                  <Badge pill variant='dark'>
                    {me.num_doc}
                  </Badge>
                </li>
              </ul>
            </Card.Body>
          }
        </Card>
        <Card border='light'>
          <Card.Header>
            <h5 className='pull-left'>List Document</h5>
            <Button
              className='pull-right'
              variant='primary'
              size='sm'
              onClick={() => this.setState({ isShowModalAdd: true })}
            >
              <i className='fa fa-cloud-upload' aria-hidden='true' /> New
            </Button>
          </Card.Header>
        </Card>
        <ListDoc
          documents={this.props.documents}
          deleteDocument={this.props.deleteDocument}
          updateStatus={this.props.updateStatus}
          handleSelectDoc={(doc) =>
            this.setState({ docSelecting: doc, isShowModalEdit: true })
          }
        />
        <ModalAdd
          isShowModal={this.state.isShowModalAdd}
          crateDocument={this.props.crateDocument}
          categories={this.props.categories}
          handleClose={() => this.setState({ isShowModalAdd: false })}
        />
        <ModalEdit
          isShowModal={this.state.isShowModalEdit}
          document={this.state.docSelecting}
          categories={this.props.categories}
          updateDocument={this.props.updateDocument}
          handleClose={() => this.setState({ isShowModalEdit: false })}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    documents: state.profile.documents,
    categories: state.admin.categories,
    me: state.app.me
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDocument: (params) => dispatch(fetchDocument(params)),
    getUserMe: (params) => dispatch(getUserMe(params)),
    crateDocument: (params, cb) => dispatch(crateDocument(params, cb)),
    deleteDocument: (params, cb) => dispatch(deleteDocument(params, cb)),
    updateDocument: (params, cb) => dispatch(updateDocument(params, cb)),
    updateStatus: (params, cb) => dispatch(updateStatus(params, cb))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocContainer)
