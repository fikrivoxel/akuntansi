export default [
  {
    to: '/',
    meta: {
      name: 'Dashboard',
      icon: 'fa-dashboard'
    }
  },
  {
    meta: {
      name: 'Jenis',
      icon: 'fa-list'
    },
    subsmenu: [
      {
        to: '/jenis-barang',
        meta: {
          name: 'Jenis Barang',
          icon: 'fa-tags'
        }
      },
      {
        to: '/jenis-status',
        meta: {
          name: 'Jenis Status',
          icon: 'fa-chart-line'
        }
      }
    ]
  }
]
