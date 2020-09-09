import React, { Component, Fragment } from 'react'
import { Table, Button } from 'react-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'
import { convertTimeStampToString } from 'common/utils'

export default class ListCategory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categorySelecting: null,
      isshowModalDel: false,
      alertSuccess: ''
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete () {
    const cb = (response) => {
      if (response) {
        this.setState({
          alertSuccess: (
            <SweetAlert success title=''
              onConfirm={() => this.setState({ alertSuccess: null })}>
            Product has been removed!
            </SweetAlert>
          ),
          isshowModalDel: false
        })
      }
    }
    const params = {
      id: this.state.categorySelecting.id
    }

    this.props.deleteCategory(params, cb)
  }

  renderModal () {
    return (
      <>
        {this.state.isshowModalDel
          ? (<SweetAlert
            warning
            title='Are you sure?'
            html
            showCancel
            confirmBtnText='Yes, delete it!'
            cancelBtnBsStyle='default'
            confirmBtnBsStyle='danger'
            onConfirm={() => this.handleDelete()}
            onCancel={() => this.setState({
              idSelecting: null,
              isshowModalDel: false
            })}
          />)
          : null
        }
        {this.state.alertSuccess}
      </>
    )
  }

  render () {
    const { categories } = this.props
    return (
      <Fragment>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Name</th>
              <th>Number Document</th>
              <th>Created at</th>
              <th style={{ width: '90px' }} />
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{category.id}</td>
                  <td>
                    {category.name}
                  </td>
                  <td>
                    {category.num_doc}
                  </td>
                  <td>{convertTimeStampToString(category.created_at)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button
                      variant='primary'
                      size='sm'
                      onClick={(e) => this.props.handleSelect(category)}
                    >
                      <i className='fa fa-pencil-square-o' aria-hidden='true' />
                    </Button>{' '}
                    <Button
                      variant='danger'
                      size='sm'
                      onClick={(e) => this.setState({
                        categorySelecting: category,
                        isshowModalDel: true
                      })}
                    >
                      <i className='fa fa-trash' aria-hidden='true' />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {this.renderModal()}
      </Fragment>
    )
  }
}
