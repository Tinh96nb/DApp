import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Badge, Card } from 'react-bootstrap'
import { statusMember } from 'common/helpers/const'
import { fetchListMember } from '../reducer'
import { Link } from 'react-router-dom'
import { fetchDocument } from 'app/document/reducer'

class MemberContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    this.props.fetchListMember()
  }

  render () {
    const { members } = this.props
    return (
      <>
        <Card border='light'>
          <Card.Header>
            <h5 className='pull-left'>List Member</h5>
          </Card.Header>
        </Card>
        <Table striped bordered hover size='sm'>
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
                  <td style={{ textAlign: 'center' }}>
                    <Badge pill variant='dark'>
                      {mem.num_doc}
                    </Badge>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <Badge
                      pill
                      variant={statusMember[mem.status].class}
                    >
                      {statusMember[mem.status].status}
                    </Badge>
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
    members: state.mem.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchListMember: (params) => dispatch(fetchListMember(params)),
    fetchDocument: (params) => dispatch(fetchDocument(params))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberContainer)
