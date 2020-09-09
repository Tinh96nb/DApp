import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Input from 'components/form/Input'
import { createToast } from 'common/helpers/toast'

export default class ModalEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      category: {
        id: 0,
        name: ''
      }
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleInput (e) {
    let value = e.target.value
    let name = e.target.name
    this.setState(
      prevState => ({
        category: {
          ...prevState.category,
          [name]: value
        }
      })
    )
  }
  handleFormSubmit (e) {
    e.preventDefault()
    const category = this.state.category
    const cb = (res) => {
      this.handleClose()
      createToast({ type: 'success', message: 'Edit success document' })
    }
    this.props.updateCategory(category, cb)
  }

  handleClose () {
    this.props.handleClose()
    this.setState({
      category: {
        id: 0,
        name: ''
      }
    })
  }

  render () {
    return (
      <Modal
        show={this.props.isShowModal}
        onHide={this.handleClose}
        onShow={() => this.setState({ category: this.props.category })}
      >
        <form onSubmit={this.handleFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Update category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              type={'text'}
              title={'Category Name'}
              name={'name'}
              value={this.state.category.name}
              placeholder={'Enter name'}
              handleChange={this.handleInput}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={this.handleClose}
            >
              Close
            </Button>
            <Button
              variant='primary'
              onClick={this.handleFormSubmit}
            >
              Save Change
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}
