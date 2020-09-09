import React from 'react'

export default class RightSideBar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeKey: null
    }
  }

  render () {
    const { categories = [] } = this.props
    return (
      <div className='d-none d-xl-block col-xl-2 right-sidebar'>
        <ul className='list-unstyled'>
          <li level='2'>
            <a href='#'>List Category</a>
            <ul className='list-unstyled'>
              {categories.map(cate => {
                return (
                  <li level='3' key={cate.id}>
                    <a href={`/document?category_id=${cate.id}`}>
                      {cate.name} ({cate.num_doc})
                    </a>
                  </li>)
              })}
            </ul>
          </li>
        </ul></div>
    )
  }
}
