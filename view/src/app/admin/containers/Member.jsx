import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createToast } from 'common/helpers/toast'
import { Table, Badge, OverlayTrigger, Tooltip, Card } from 'react-bootstrap'
import { statusMember, lableMember } from 'common/helpers/const'
import {
  fetchListMember,
  updateStatusMember,
  createMember
} from '../reducer'

import { fetchDocument } from 'app/document/reducer'

class MemberContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
  }

  componentWillMount () {
    this.props.fetchListMember()
  }

  handleChangeStatus (id, status) {
    const cb = (res) => {
      createToast({ type: 'success', message: 'Change status success!' })
    }
    this.props.updateStatusMember({ id, status }, cb)
  }

  render () {
    const { members } = this.props
    return (
      <>
        <Card border='light'>
          <Card.Header>
            <h5 className='pull-left'>Manager member</h5>
          </Card.Header>
        </Card>
        <Table striped bordered hover size='sm' className='admin-mem'>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Address</th>
              <th style={{ width: '20%' }}>Balance</th>
              <th style={{ width: '10%' }}>N.Doc</th>
              <th style={{ width: '13%', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((mem, index) => {
              return (
                <tr key={index}>
                  <td>{mem.id}</td>
                  <td>
                    <Link
                      to={`/document?owner=${mem.address}`}
                      onClick={() => this.props.fetchDocument({ owner: mem.address })}
                    >
                      {mem.address}
                    </Link>
                  </td>
                  <td>{mem.balance} ether</td>
                  <td style={{ textAlign: ' center' }}>
                    <Badge pill variant='dark'>
                      {mem.num_doc}
                    </Badge>
                  </td>
                  <td style={{ textAlign: ' center' }} >
                    <OverlayTrigger
                      placement={'right'}
                      overlay={<Tooltip>
                      Click to {mem.status !== lableMember.BLOCK ? 'BLOCK' : 'ACTIVE'}
                      </Tooltip>}
                    >
                      <Badge
                        onClick={() => this.handleChangeStatus(
                          mem.id,
                          mem.status !== lableMember.BLOCK ? lableMember.BLOCK : lableMember.ACTIVE
                        )}
                        pill
                        variant={statusMember[mem.status].class}
                      >
                        {statusMember[mem.status].status}
                      </Badge>
                    </OverlayTrigger>
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
    members: state.admin.members
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchListMember: (params) => dispatch(fetchListMember(params)),
    fetchDocument: (params) => dispatch(fetchDocument(params)),
    updateStatusMember: (params, cb) => dispatch(updateStatusMember(params, cb)),
    createMember: (params, cb) => dispatch(createMember(params, cb))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberContainer)
