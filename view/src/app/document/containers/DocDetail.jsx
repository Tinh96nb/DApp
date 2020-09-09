import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Badge, Button } from 'react-bootstrap'
import { convertTimeStampToString } from 'common/utils'
import { get } from 'common/helpers/session'
import { statusDocument } from 'common/helpers/const'
import { fetchDocumentById } from '../reducer'

class DocDetailContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModalAdd: false,
      isShowModalUpdate: false
    }
  }

  componentWillMount () {
    const { id } = this.props.match.params
    this.props.fetchDocumentById({ id })
  }

  handeDownloadfile (id) {
    const token = get()
    const link = `${process.env.API_ORIGIN}/documents/file/${id}?access_token=${token}`
    window.open(link, '_blank')
  }

  render () {
    const { document = null } = this.props
    return (
      <div>
        <Card>
          <Card.Header>
            <h5 className='pull-left'>{document.name}</h5>
            <Button
              className='pull-right'
              variant='primary'
              size='sm'
              onClick={() => this.handeDownloadfile(document.id)}
            >
              <i className='fa fa-arrow-circle-o-down' aria-hidden='true' /> Download
            </Button>
          </Card.Header>
          {document &&
            <Card.Body>
              <ul>
                <li>
                  <div className='title'><span>Owner</span></div>
                  {document.owner}
                </li>
                <li>
                  <div className='title'><span>Hash value</span></div>
                  {document.content_hash}
                </li>
                <li>
                  <div className='title'><span>Ipfs crypt</span></div>
                  {document.link_ipfs_crypt}
                </li>
                <li>
                  <div className='title'><span>Description</span></div>
                  {document.description || 'null'}
                </li>
                <li>
                  <div className='title'><span>Category</span></div>
                  {document.category_name}
                </li>
                <li>
                  <div className='title'><span>Size file</span></div>
                  {document.size} kb
                </li>
                <li>
                  <div className='title'><span>Status</span></div>
                  {statusDocument[document.status] && <Badge
                    pill
                    variant={statusDocument[document.status].class}
                  >
                    {statusDocument[document.status].status}
                  </Badge>
                  }
                </li>
                <li>
                  <div className='title'><span>Created at</span></div>
                  {convertTimeStampToString(document.created_at)}
                </li>
              </ul>
            </Card.Body>
          }
        </Card>
        <Card>
          <Card.Header>
            <h5 className='pull-left'>Transaction</h5>
          </Card.Header>
          {document.transaction && <Card.Body>
            <ul>
              <li>
                <div className='title'><span>Block number</span></div>
                {document.transaction.block_number}
              </li>
              <li>
                <div className='title'><span>Block hash</span></div>
                {document.transaction.block_hash}
              </li>
              <li>
                <div className='title'><span>Trans hash</span></div>
                {document.transaction.trans_hash}
              </li>
              <li>
                <div className='title'><span>From</span></div>
                {document.transaction.from}
              </li>
              <li>
                <div className='title'><span>Gas used</span></div>
                {document.transaction.gas_used} Gwei
              </li>
              <li>
                <div className='title'><span>Created at</span></div>
                {convertTimeStampToString(document.transaction.created_at)}
              </li>
            </ul>
          </Card.Body>
          }
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    document: state.doc.one
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDocumentById: (params) => dispatch(fetchDocumentById(params))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocDetailContainer)
