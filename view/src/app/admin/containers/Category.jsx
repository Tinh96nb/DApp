import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchListCategory,
  createCategory,
  deleteCategory,
  updateCategory
} from '../reducer'
import { Button, Card } from 'react-bootstrap'

import ModalAdd from '../components/ModalAddCategory'
import ModalEdit from '../components/ModalEditCategory'
import ListCategory from '../components/ListCategory'

class CategoryContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModalAdd: false,
      isShowModalUpdate: false,
      categorySelecting: null
    }
  }

  componentWillMount () {
    this.props.fetchListCategory()
  }
  render () {
    const { categories } = this.props
    return (
      <div>
        <Card border='light'>
          <Card.Header>
            <h5 className='pull-left'>Manager Category</h5>
            <Button
              className='pull-right'
              variant='primary'
              size='sm'
              onClick={() => this.setState({ isShowModalAdd: true })}
            >
              <i className='fa fa-plus-circle' aria-hidden='true' /> Create
            </Button>
          </Card.Header>
        </Card>

        <ListCategory
          categories={categories}
          deleteCategory={this.props.deleteCategory}
          handleSelect={(category) =>
            this.setState({ categorySelecting: category, isShowModalEdit: true })
          }
        />
        <ModalAdd
          isShowModal={this.state.isShowModalAdd}
          createCategory={this.props.createCategory}
          categories={this.props.categories}
          handleClose={() => this.setState({ isShowModalAdd: false })}
        />
        <ModalEdit
          isShowModal={this.state.isShowModalEdit}
          category={this.state.categorySelecting}
          updateCategory={this.props.updateCategory}
          handleClose={() => this.setState({ isShowModalEdit: false })}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.admin.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchListCategory: (params) => dispatch(fetchListCategory(params)),
    createCategory: (params, cb) => dispatch(createCategory(params, cb)),
    deleteCategory: (params, cb) => dispatch(deleteCategory(params, cb)),
    updateCategory: (params, cb) => dispatch(updateCategory(params, cb))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryContainer)
