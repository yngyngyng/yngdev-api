const mongoose = require('mongoose')
const Schema = mongoose.Schema

const colorsDataSchema = new Schema(
  {
    articles: { type: ['Mixed'] },
    products: { type: ['Mixed'] },
    index: { type: ['Mixed'] }
  },
  { minimize: false }
)

module.exports = mongoose.model('ColorsData', colorsDataSchema, 'colors')
