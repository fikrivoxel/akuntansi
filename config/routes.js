/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  '/*': { view: 'pages/default', skipAssets: true, skipRegex: /^\/api\/.*$/ },

  //Authentication
  'POST /api/signin': 'AuthController.signin',
  'POST /api/signup': 'AuthController.signup',

  //Jenis Barang
  'POST /api/jenisbarang': { action: 'jenisbarang/create' },
  'PUT /api/jenisbarang/:kode_jenis_id': { action: 'jenisbarang/update' },
  'PATCH /api/jenisbarang/:kode_jenis_id': { action: 'jenisbarang/update' },
  'DELETE /api/jenisbarang/:kode_jenis': { action: 'jenisbarang/delete' },
  'GET /api/jenisbarang': { action: 'jenisbarang/find-all' },
  'GET /api/jenisbarang/:kode_jenis': { action: 'jenisbarang/find-by-kode' },
  'GET /api/jenisbarang/:jenis_barang/name': { action: 'jenisbarang/find-by-name' },

  //Status Barang
  'POST /api/statusbarang': { action: 'statusbarang/create' },
  'PUT /api/statusbarang': { action: 'statusbarang/update' },
  'PATCH /api/statusbarang': { action: 'statusbarang/update' },
  'DELETE /api/statusbarang/:nama_status': { action: 'statusbarang/delete' },
  'GET /api/statusbarang': { action: 'statusbarang/find-all' },
  'GET /api/statusbarang/:id': { action: 'statusbarang/find-by-id' },
  'GET /api/statusbarang/:nama_status/name': { action: 'statusbarang/find-by-name' },

  //Barang
  'POST /api/barang': { action: 'barang/create' },
  'PUT /api/barang/:kode_barang_id': { action: 'barang/update' },
  'PATCH /api/barang/:kode_barang_id': { action: 'barang/update' },
  'DELETE /api/barang/:kode_barang': { action: 'barang/delete' },
  'GET /api/barang': { action: 'barang/find-all' },
  'GET /api/barang/:criteria': { action: 'barang/find' },
  'GET /api/barang/:nama_barang/name': { action: 'barang/find-by-name' },
  'GET /api/barang/:jenis_harga_jual/harga': { action: 'barang/find-by-jenis-harga-jual' },
  'GET /api/barang/:kode_barang/kode': { action: 'barang/find-by-kode' },
  'GET /api/barang/:id/id': { action: 'barang/find-by-id' },

  //Konversi Satuan
  'POST /api/satuan': { action: 'konversisatuan/create' },
  'POST /api/satuan/bulk': { action: 'konversisatuan/create-bulk' },
  'PUT /api/satuan': { action: 'konversisatuan/update' },
  'PATCH /api/satuan': { action: 'konversisatuan/update' },
  'DELETE /api/satuan/:id': { action: 'konversisatuan/delete' },
  'GET /api/satuan': { action: 'konversisatuan/find-all' },
  'GET /api/satuan/:id': { action: 'konversisatuan/find-by-id' },
  'GET /api/satuan/:name/name': { action: 'konversisatuan/find-by-name' },
  'GET /api/satuan/:id/barang': { action: 'konversisatuan/find-by-barang-id' },

  //Jenis Jual
  'POST /api/jenisjual': { action: 'jenisjual/create' },
  'PUT /api/jenisjual/:kode_jenis_id': { action: 'jenisjual/update' },
  'PATCH /api/jenisjual/:kode_jenis_id': { action: 'jenisjual/update' },
  'DELETE /api/jenisjual/:kode_jenis': { action: 'jenisjual/delete' },
  'GET /api/jenisjual': { action: 'jenisjual/find-all' },
  'GET /api/jenisjual/:kode_jenis': { action: 'jenisjual/find-by-kode' },
  'GET /api/jenisjual/:jenis_jual/name': { action: 'jenisjual/find-by-name' },

  //Harga Jual
  'POST /api/hargajual': { action: 'hargajual/create' },
  'POST /api/hargajual/bulk': { action: 'hargajual/create-bulk' },
  'PUT /api/hargajual': { action: 'hargajual/update' },
  'PATCH /api/hargajual': { action: 'hargajual/update' },
  'DELETE /api/hargajual/:id': { action: 'hargajual/delete' },
  'GET /api/hargajual': { action: 'hargajual/find-all' },
  'GET /api/hargajual/:id': { action: 'hargajual/find-by-id' },
  'GET /api/hargajual/:jenis_jual/name': { action: 'hargajual/find-by-jenis-jual-name' },
  'GET /api/hargajual/:id/barang': { action: 'hargajual/find-by-barang-id' },

  //Status Karyawan
  'POST /api/statuskaryawan': { action: 'statuskaryawan/create' },
  'PUT /api/statuskaryawan': { action: 'statuskaryawan/update' },
  'PATCH /api/statuskaryawan': { action: 'statuskaryawan/update' },
  'DELETE /api/statuskaryawan/:nama_status': { action: 'statuskaryawan/delete' },
  'GET /api/statuskaryawan': { action: 'statuskaryawan/find-all'},
  'GET /api/statuskaryawan/:id': { action: 'statuskaryawan/find-by-id'},
  'GET /api/statuskaryawan/:nama_status/name': { action: 'statuskaryawan/find-by-name' },

  //Jabatan
  'POST /api/jabatan': { action: 'jabatan/create' },
  'PUT /api/jabatan': { action: 'jabatan/update' },
  'PATCH /api/jabatan': { action: 'jabatan/update' },
  'DELETE /api/jabatan/:nama_jabatan': { action: 'jabatan/delete' },
  'GET /api/jabatan': { action: 'jabatan/find-all'},
  'GET /api/jabatan/:id': { action: 'jabatan/find-by-id' },
  'GET /api/jabatan/:nama_jabatan/name': { action: 'jabatan/find-by-name' },

  //Karyawan
  'POST /api/karyawan': { action: 'karyawan/create' },
  'POST /api/karyawan/tunjangan': { action: 'karyawan/add-tunjangan' },
  'PUT /api/karyawan': { action: 'karyawan/update' },
  'PATCH /api/karyawan': { action: 'karyawan/update' },
  'DELETE /api/karyawan/:id': { action: 'karyawan/delete' },
  'DELETE /api/karyawan/tunjangan': { action: 'karyawan/remove-tunjangan' },
  'GET /api/karyawan': { action: 'karyawan/find-all'},
  'GET /api/karyawan/:id': { action: 'karyawan/find-by-id' },
  'GET /api/karyawan/:nama/name': { action: 'karyawan/find-by-name' },

  //Gudang
  'POST /api/gudang': { action: 'gudang/create' },
  'PUT /api/gudang': { action: 'gudang/update' },
  'PATCH /api/gudang': { action: 'gudang/update' },
  'DELETE /api/gudang/:id': { action: 'gudang/delete' },
  'GET /api/gudang': { action: 'gudang/find-all'},
  'GET /api/gudang/:id': { action: 'gudang/find-by-id'},
  'GET /api/gudang/:nomor_gudang/nomor': { action: 'gudang/find-by-nomor' },
  'GET /api/gudang/:nama/name': { action: 'gudang/find-by-name' },

  //Tunjangan 
  'POST /api/tunjangan': { action: 'tunjangan/create' },
  'PUT /api/tunjangan': { action: 'tunjangan/update' },
  'PATCH /api/tunjangan': { action: 'tunjangan/update' },
  'DELETE /api/tunjangan/:id': { action: 'tunjangan/delete' },
  'GET /api/tunjangan': { action: 'tunjangan/find-all'},
  'GET /api/tunjangan/:id': { action: 'tunjangan/find-by-id'},
  'GET /api/tunjangan/:karyawan_id/karyawan': { action: 'tunjangan/find-by-karyawan-id' },
  'GET /api/tunjangan/:name/name': { action: 'tunjangan/find-by-name' },

  //Supplier
  'POST /api/supplier': { action: 'supplier/create' },
  'PUT /api/supplier': { action: 'supplier/update' },
  'PATCH /api/supplier': { action: 'supplier/update' },
  'DELETE /api/supplier/:id': { action: 'supplier/delete' },
  'GET /api/supplier': { action: 'supplier/find-all' },
  'GET /api/supplier/:id': { action: 'supplier/find-by-id' },
  'GET /api/supplier/:nama_supplier/name': { action: 'supplier/find-by-name' },

  //Customer
  'POST /api/customer': { action: 'customer/create' },
  'PUT /api/customer': { action: 'customer/update' },
  'PATCH /api/customer': { action: 'customer/update' },
  'DELETE /api/customer/:id': { action: 'customer/delete' },
  'GET /api/customer': { action: 'customer/find-all' },
  'GET /api/customer/:id': { action: 'customer/find-by-id' },
  'GET /api/customer/:nama_customer/name': { action: 'customer/find-by-name' },

  //Stok Fisik
  'POST /api/stokfisik': { action: 'stokfisik/create' },
  'PUT /api/stokfisik': { action: 'stokfisik/update' },
  'PATCH /api/stokfisik': { action: 'stokfisik/update' },
  'DELETE /api/stokfisik/:id': { action: 'stokfisik/delete' },
  'GET /api/stokfisik': { action: 'stokfisik/find-all' },
  'GET /api/stokfisik/:id': { action: 'stokfisik/find-by-id' },
  'GET /api/stokfisik/stok': { action: 'stokfisik/find-by-stok' },

  //User
  'POST /api/user': { action: 'user/create' },
  'PUT /api/user': { action: 'user/update' },
  'PATCH /api/user': { action: 'user/update' },
  'DELETE /api/user/:email': { action: 'user/delete' },
  'GET /api/user': { action: 'user/find-all' },
  'GET /api/user/:id': { action: 'user/find-by-id' },
  'GET /api/user/:email/email': { action: 'user/find-by-email' },
};
