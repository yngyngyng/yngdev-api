const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productsSchema = new Schema(
  {
    featured: { type: ['Mixed'] }
  },
  { minimize: false }
)

module.exports = mongoose.model('ProductsData', productsSchema, 'products')
