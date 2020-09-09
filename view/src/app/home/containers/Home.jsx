import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Table, Button, Modal } from 'react-bootstrap'
import { getSumary, getBlockchain } from '../reducer'
import { timeStampToString } from 'common/utils'
class HomeContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModal: false,
      dataBlock: null,
      dataTrans: null
    }
  }
  componentWillMount () {
    this.props.getSumary()
    this.props.getBlockchain()
  }

  renderBlock () {
    const blockInfo = this.state.dataBlock
    return (
      <ul className='info'>
        <li>
          <div className='title'>Number:</div>
          {blockInfo.number}
        </li>
        <li>
          <div className='title'>Timestamp:</div>
          {timeStampToString(blockInfo.timestamp)}
        </li>
        <li>
          <div className='title'>Transactions:</div>
          {blockInfo.transactions.length}
        </li>
        <li>
          <div className='title'>Mined by:</div>
          {blockInfo.miner}
        </li>
        <li>
          <div className='title'>Total Difficulty:</div>
          {blockInfo.totalDifficulty}
        </li>
        <li>
          <div className='title'>Size:</div>
          {blockInfo.size} bytes
        </li>
        <li>
          <div className='title'>Gas Used:</div>
          {blockInfo.gasUsed}
        </li>
        <li>
          <div className='title'>Gas Limit:</div>
          {blockInfo.gasLimit}
        </li>
        <li>
          <div className='title'>Hash:</div>
          {blockInfo.hash}
        </li>
        <li>
          <div className='title'>Parent Hash:</div>
          {blockInfo.parentHash}
        </li>
      </ul>
    )
  }

  renderTrans () {
    const trans = this.state.dataTrans
    return (
      <ul className='info'>
        <li>
          <div className='title'>Hash:</div>
          {trans.hash}
        </li>
        <li>
          <div className='title'>Block:</div>
          {trans.blockHash}
        </li>
        <li>
          <div className='title'>From:</div>
          {trans.from}
        </li>
        <li>
          <div className='title'>To:</div>
          {trans.to} bytes
        </li>
        <li>
          <div className='title'>Value:</div>
          {trans.value} wei
        </li>
        <li>
          <div className='title'>Gas:</div>
          {trans.gas}
        </li>
        <li>
          <div className='title'>Gas Price:</div>
          {trans.gasPrice}
        </li>
        <li>
          <div className='title'>Nonce:</div>
          {trans.nonce}
        </li>
      </ul>
    )
  }

  render () {
    const { sumary, blocks, transactions } = this.props
    return (
      <div className='dashboard'>
        {sumary && <div className='row'>
          <div className='col-md-3 col-sm-6 col-xs-12'>
            <div className='info-box'>
              <span className='info-box-icon bg-primary'>
                <i className='fa fa-file-text' aria-hidden='true' />
              </span>
              <div className='info-box-content'>
                <span className='info-box-text'>Document</span>
                <span className='info-box-number'>{ sumary.document }</span>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 col-xs-12'>
            <div className='info-box'>
              <span className='info-box-icon bg-info'>
                <i className='fa fa-list' />
              </span>
              <div className='info-box-content'>
                <span className='info-box-text'>Category</span>
                <span className='info-box-number'>{ sumary.category }</span>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 col-xs-12'>
            <div className='info-box'>
              <span className='info-box-icon bg-success'>
                <i className='fa fa-user' aria-hidden='true' />
              </span>

              <div className='info-box-content'>
                <span className='info-box-text'>Member</span>
                <span className='info-box-number'>{ sumary.member }</span>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-sm-6 col-xs-12'>
            <div className='info-box'>
              <span className='info-box-icon bg-danger'>
                <i className='fa fa-exchange' aria-hidden='true' />
              </span>

              <div className='info-box-content'>
                <span className='info-box-text'>Transactions</span>
                <span className='info-box-number'>{ transactions.length }</span>
              </div>
            </div>
          </div>
        </div>
        }
        <div className='row blockchain'>
          <div className='col-md-6'>
            <Card>
              <Card.Header><h5 className='pull-left'>Latest Blocks</h5></Card.Header>
              <Card.Body>
                <Table hover size='sm'>
                  <thead>
                    <tr>
                      <th style={{ width: '10%' }}>#</th>
                      <th>Hash</th>
                      <th>Miner</th>
                      <th style={{ width: '10%' }} />
                    </tr>
                  </thead>
                  <tbody>
                    {blocks.map((block, index) => {
                      return (
                        <tr key={index}>
                          <td>{block.number}</td>
                          <td>{block.hash.substring(0, 12)}...</td>
                          <td>{block.miner.substring(0, 12)}...</td>
                          <td>
                            <Button
                              variant='primary'
                              size='sm'
                              onClick={() => this.setState({
                                isShowModal: true,
                                dataBlock: block
                              })}
                            >
                              <i className='fa fa-eye' aria-hidden='true' />
                            </Button></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
          <div className='col-md-6'>
            <Card>
              <Card.Header><h5 className='pull-left'>Latest ransactions</h5></Card.Header>
              <Card.Body>
                <Table hover size='sm'>
                  <thead>
                    <tr>
                      <th>Tx</th>
                      <th>Form</th>
                      <th>To</th>
                      <th style={{ width: '10%' }} />
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((trans, index) => {
                      return (
                        <tr key={index}>
                          <td>{trans.hash.substring(0, 9)}...</td>
                          <td>{trans.from.substring(0, 9)}...</td>
                          <td>
                            {trans.to
                              ? trans.to.substring(0, 9)
                              : 'null'
                            }...
                          </td>
                          <td>
                            <Button
                              variant='primary'
                              size='sm'
                              onClick={() => this.setState({
                                isShowModal: true,
                                dataTrans: trans
                              })}
                            >
                              <i className='fa fa-eye' aria-hidden='true' />
                            </Button></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

          </div>
        </div>
        <Modal
          size='lg'
          show={this.state.isShowModal}
          onHide={() => this.setState({
            isShowModal: false,
            dataBlock: null,
            dataTrans: null
          })}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.dataBlock && 'Block Detail'}
              {this.state.dataTrans && 'Transaction'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.dataBlock && this.renderBlock()}
            {this.state.dataTrans && this.renderTrans()}
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sumary: state.home.sumary,
    blocks: state.home.blocks,
    transactions: state.home.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSumary: () => dispatch(getSumary()),
    getBlockchain: () => dispatch(getBlockchain())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
