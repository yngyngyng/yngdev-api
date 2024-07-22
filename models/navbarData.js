const mongoose = require('mongoose')
const Schema = mongoose.Schema

const navbarDataSchema = new Schema(
  {
    items: { type: ['Mixed'] }
  },
  { minimize: false }
)

module.exports = mongoose.model('NavbarData', navbarDataSchema, 'navbar')
