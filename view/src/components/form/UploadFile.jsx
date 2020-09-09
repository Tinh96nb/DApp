import React from 'react'

class UploadFile extends React.Component {
  constructor () {
    super()
    this.state = {
      nameFile: null
    }
    this.handleselectedFile = this.handleselectedFile.bind(this)
  }

  handleselectedFile (event) {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    this.setState({ nameFile: file.name })
    let reader = new window.FileReader()
    reader.onload = () => {
      const result = {
        base64: reader.result,
        name: file.name,
        size: file.size
      }
      this.props.getInfo(result)
    }
    reader.readAsDataURL(file)
  }

  render () {
    const { isRequired = false } = this.props
    return (
      <div className='form-group'>
        <label>Select file document
        </label>
        {isRequired && <span className='text-danger'> *</span>}
        <div className='d-flex justify-content-center'>
          <div className='col col-md-7' style={{ cursor: 'pointer' }}>
            <input className='custom-file-input' type='file' onChange={this.handleselectedFile} />
            <label className='custom-file-label'>{this.state.nameFile ? this.state.nameFile : 'Choose file'}</label>
          </div>
        </div>
      </div>
    )
  }
}
export default UploadFile
