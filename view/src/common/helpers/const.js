export const asideMenu = [
  {
    icon: 'fa-tachometer',
    link: '/',
    name: 'Dashbroad'
  },
  {
    icon: 'fa-file-text',
    link: '/document',
    name: 'Document'
  },
  {
    icon: 'fa-users',
    link: '/member',
    name: 'Member'
  },
  {
    icon: 'fa-user',
    link: '/profile',
    name: 'Profile'
  }
]

export const asideMenuAdmin = [
  {
    icon: 'fa-file-text',
    link: '/admin/document',
    name: 'Document'
  },
  {
    icon: 'fa-users',
    link: '/admin/member',
    name: 'Member'
  },
  {
    icon: 'fa-list',
    link: '/admin/category',
    name: 'Category'
  }
]

export const statusDocument = {
  0: { code: 0, status: 'PENDDING', class: 'danger' },
  1: { code: 1, status: 'CLOSED', class: 'secondary' },
  2: { code: 2, status: 'ACEPTED', class: 'success' },
  3: { code: 3, status: 'REJECTED', class: 'dark' }
}
export const lableDocument = {
  'PENDDING': 0,
  'CLOSED': 1,
  'ACEPTED': 2,
  'REJECTED': 3
}
export const statusMember = {
  0: { code: 0, status: 'BANNED', class: 'dark' },
  1: { code: 1, status: 'ACTIVE', class: 'success' }
}

export const lableMember = {
  BLOCK: 0,
  ACTIVE: 1
}
