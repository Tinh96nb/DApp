import React, { Component } from 'react'
import { Table, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { convertTimeStampToString } from 'common/utils'
import { statusDocument } from 'common/helpers/const'

export default class ListDoc extends Component {
  render () {
    const { documents } = this.props

    return (
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>#</th>
            <th>Name</th>
            <th>Owner</th>
            <th style={{ width: '90px' }}>Status</th>
            <th style={{ width: '120px' }}>Category</th>
            <th style={{ width: '150px' }}>Upload at</th>
          </tr>
        </thead>
        <tbody>
          {documents.length > 0 ? documents.map((doc, index) => {
            return (
              <tr key={index}>
                <td>{doc.id}</td>
                <td>
                  <Link to={`/document/${doc.id}`}>
                    {doc.name}
                  </Link>
                </td>
                <td>{doc.owner}</td>
                <td >
                  {statusDocument[doc.status] && <Badge
                    pill
                    variant={statusDocument[doc.status].class}
                  >
                    {statusDocument[doc.status].status}
                  </Badge>
                  }
                </td>
                <td>{doc.category_name}</td>
                <td>{convertTimeStampToString(doc.created_at)}</td>
              </tr>
            )
          }) : null}
        </tbody>
      </Table>
    )
  }
}
