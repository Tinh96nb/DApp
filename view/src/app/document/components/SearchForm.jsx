import React, { Component } from 'react'
import Input from 'components/form/Input'
import Select from 'components/form/Select'
import { encodeQueryData } from 'common/utils'
import { ButtonGroup } from 'react-bootstrap'
export default class FormSearch extends Component {
  constructor (props) {
    super(props)

    this.state = {
      alertSuccess: '',
      document: {
        name: '',
        owner: '',
        status: '',
        category_id: ''
      }
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
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

  handleReset () {
    this.setState({
      document: {
        name: '',
        owner: '',
        status: '',
        category_id: ''
      }
    })
    this.props.router.push('/document')
    this.props.fetchDocument()
  }

  handleSearch (e) {
    e.preventDefault()
    const params = { ...this.state.document }
    for (const key in params) {
      if (!params.hasOwnProperty(key)) continue
      if (typeof params[key] === 'string') params[key] = params[key].trim()
      if (params[key] === '') delete params[key]
    }
    const queryParams = encodeQueryData({ ...params })
    this.props.router.push(`/document?${queryParams}`)
    this.props.fetchDocument(params)
  }

  componentWillReceiveProps (props) {
    if (props.query) {
      this.setState({ document: props.query })
    }
  }
  render () {
    return (
    <>
      <form onSubmit={this.handleSearch}>
        <div className='form-row'>
          <div className='col-md-3'>
            <Input
              type={'text'}
              name={'name'}
              value={this.state.document.name || ''}
              placeholder={'Enter name'}
              handleChange={this.handleInput}
            />
          </div>
          <div className='col-md-3'>
            <Input
              type={'text'}
              name={'owner'}
              value={this.state.document.owner || ''}
              placeholder={'Address owner'}
              handleChange={this.handleInput}
            />
          </div>
          <div className='col-md-3'>
            <Select
              type={'text'}
              name={'category_id'}
              options={this.props.categories}
              value={this.state.document.category_id}
              placeholder={'Select category'}
              handleChange={this.handleInput}
            />
          </div>
          <div className='col-md-2'>
            <Select
              name={'status'}
              options={[
                { name: 'PENDDING', id: 0 },
                { name: 'CLOSED', id: 1 },
                { name: 'ACEPTED', id: 2 },
                { name: 'REJECTED', id: 3 }
              ]}
              value={this.state.document.status}
              placeholder={'Select status'}
              handleChange={this.handleInput}
            />
          </div>
          <div className='col-md-1 list-btn'>
            <ButtonGroup>
              <button type='submit' className='btn btn-primary btn-sm'>
                <i className='fa fa-search' aria-hidden='true' />
              </button>
              <button
                type='button'
                className='btn btn-primary btn-sm'
                onClick={this.handleReset}
              >
                <i className='fa fa-repeat' aria-hidden='true' />
              </button>

            </ButtonGroup>
          </div>
        </div>
      </form>
    </>
    )
  }
}
