const mongoose = require('mongoose')
const Schema = mongoose.Schema

const settingsSchema = new Schema(
  {
    info: { type: ['Mixed'] },
    username: { type: ['Mixed'] },
    footer: { type: ['Mixed'] }
  },
  { minimize: false }
)

module.exports = mongoose.model('SettingsData', settingsSchema, 'settings')
