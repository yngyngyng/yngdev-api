const mongoose = require('mongoose')
const Schema = mongoose.Schema

const footerDataSchema = new Schema(
  {
    resources: { type: ['Mixed'] },
    links: { type: ['Mixed'] },
    social: { type: ['Mixed'] }
  },
  { minimize: false }
)

module.exports = mongoose.model('FooterData', footerDataSchema, 'footer')
