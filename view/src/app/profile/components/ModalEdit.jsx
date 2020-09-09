import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import UploadFile from 'components/form/UploadFile'
import Input from 'components/form/Input'
import Select from 'components/form/Select'
import TextArea from 'components/form/TextArea'
import { createToast } from 'common/helpers/toast'

export default class ModalEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      document: {
        id: 0,
        name: '',
        category_id: 1,
        file_content: '',
        size: 0,
        description: ''
      }
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.infoFileUpload = this.infoFileUpload.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  infoFileUpload (result) {
    this.setState(
      prevState => ({
        document: {
          ...prevState.document,
          name: result.name,
          file_content: result.base64,
          size: result.size
        }
      })
    )
  }

  handleInput (e) {
    let value = e.target.value
    let name = e.target.name
    this.setState(
      prevState => ({
        document: {
          ...prevState.document,
          [name]: value
        }
      })
    )
  }
  handleFormSubmit (e) {
    e.preventDefault()
    const doc = this.state.document
    const cb = (res) => {
      this.handleClose()
      createToast({ type: 'success', message: 'Edit document success!' })
    }
    this.props.updateDocument(doc, cb)
  }

  handleClose () {
    this.props.handleClose()
    this.setState({
      document: {
        id: 0,
        name: '',
        category_id: 1,
        file_content: '',
        size: 0,
        description: ''
      }
    })
  }
  componentWillReceiveProps (props) {
    if (props.document) {
      this.setState({ document: props.document })
    }
  }

  render () {
    return (
      <Modal
        show={this.props.isShowModal}
        onHide={this.handleClose}
      >
        <form onSubmit={this.handleFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Update document</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UploadFile getInfo={this.infoFileUpload} isRequired={false} />
            <Input
              type={'text'}
              title={'Document Name'}
              name={'name'}
              value={this.state.document.name}
              placeholder={'Enter name'}
              handleChange={this.handleInput}
            />
            <Select
              title={'Category'}
              name={'category_id'}
              options={this.props.categories}
              value={this.state.document.category_id}
              placeholder={'Select category'}
              handleChange={this.handleInput}
            />
            <TextArea
              title={'Description'}
              rows={4}
              value={this.state.document.description}
              name={'description'}
              handleChange={this.handleInput}
              placeholder={'Enter some thing description for document'}
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
