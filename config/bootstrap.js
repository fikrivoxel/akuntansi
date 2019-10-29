/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const faker = require('faker')

module.exports.bootstrap = async function() {
  let jenisbars = Array.from({length: 100}, () => {
    return {
      kode_jenis: faker.random.uuid(),
      jenis_barang: faker.name.firstName()
    }
  })
  await JenisBarang.createEach(jenisbars)
};
