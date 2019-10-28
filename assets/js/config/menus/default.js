export default [
  {
    to: '/',
    meta: {
      name: 'Dashboard',
      icon: 'fa fa-dashboard'
    }
  },
  {
    meta: {
      name: 'Menu',
      icon: 'fa fa-folder'
    },
    subsmenu: [
      {
        to: '/',
        meta: {
          name: 'Subs Menu',
          icon: 'fa fa-folder'
        }
      }
    ]
  },
  {
    to: '/jenis-barang',
    meta: {
      name: 'Jenis Barang',
      icon: 'fa fa-tags'
    }
  },
  {
    to: '/status-barang',
    meta: {
      name: 'Status Barang',
      icon: 'fa fa-chart-line'
    }
  },
  {
    to: '/jenis-jual',
    meta: {
      name: 'Jenis Jual',
      icon: 'fab fa-sellcast'
    }
  },
  {
    to: '/barang',
    meta: {
      name: 'Barang',
      icon: 'fa fa-archive'
    }
  }
]
