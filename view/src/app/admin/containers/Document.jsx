import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Badge, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { convertTimeStampToString } from 'common/utils'
import { statusDocument, lableDocument } from 'common/helpers/const'

import { fetchDocument, updateStatusDoc } from '../reducer'
import { createToast } from 'common/helpers/toast'

export class ListDoc extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this.handleChangeStatus = this.handleChangeStatus.bind(this)
  }

  componentWillMount () {
    this.props.fetchDocument()
  }

  handleChangeStatus (id, status) {
    const cb = (res) => {
      createToast({ type: 'success', message: 'Change status success!' })
    }
    this.props.updateStatus({ id, status }, cb)
  }

  renderAction (id, status) {
    return (<div>
      <select
        disabled={status === lableDocument.CLOSED}
        className='form-control form-control-sm'
        defaultValue={status === lableDocument.CLOSED ? 0 : status}
        onChange={(e) => {
          const status = e.target.value
          this.handleChangeStatus(id, status)
        }
        }>
        <option value={0} disabled>Select status</option>
        <option value={lableDocument.ACEPTED}>ACEPT</option>
        <option value={lableDocument.REJECTED}>REJECT</option>
      </select>
    </div>)
  }

  render () {
    const { documents } = this.props
    return (
      <>
        <Card border='light'>
          <Card.Header>
            <h5 className='pull-left'>Manager document</h5>
          </Card.Header>
        </Card>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Name</th>
              <th>Owner</th>
              <th style={{ width: '90px' }}>Status</th>
              <th style={{ width: '100px' }}>Category</th>
              <th>Upload at</th>
              <th>Change status</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => {
              return (
                <tr key={index}>
                  <td>{doc.id}</td>
                  <td>
                    <Link to={`/document/${doc.id}`}>
                      {doc.name}
                    </Link>
                  </td>
                  <td>{doc.owner}</td>
                  <td>
                    <Badge
                      pill
                      variant={statusDocument[doc.status].class}
                    >
                      {statusDocument[doc.status].status}
                    </Badge>
                  </td>
                  <td>{doc.category_name}</td>
                  <td>{convertTimeStampToString(doc.created_at)}</td>
                  <td>
                    {this.renderAction(doc.id, doc.status)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    documents: state.admin.documents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDocument: (params) => dispatch(fetchDocument(params)),
    updateStatus: (params, cb) => dispatch(updateStatusDoc(params, cb))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDoc)
