const mongoose = require('mongoose')
const Schema = mongoose.Schema

const heroDataSchema = new Schema(
  {
    data: { type: ['Mixed'] }
  },
  { minimize: false }
)

module.exports = mongoose.model('HeroData', heroDataSchema, 'hero')
