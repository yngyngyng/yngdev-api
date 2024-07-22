const FooterData = require('../models/footerData')
const ColorsData = require('../models/colorsData')
const ProductsData = require('../models/productsData')
const HeroData = require('../models/heroData')
const NavbarData = require('../models/navbarData')
const SettingsData = require('../models/settingsData')

module.exports = {
  footer: async (req, res) => {
    const footerData = await FooterData.find({})
    res.apiSuccess(footerData)
  },
  colors: async (req, res) => {
    const colorsData = await ColorsData.find({})
    res.apiSuccess(colorsData)
  },
  products: async (req, res) => {
    const productsData = await ProductsData.find({})
    res.apiSuccess(productsData)
  },
  hero: async (req, res) => {
    const heroData = await HeroData.find({})
    res.apiSuccess(heroData)
  },
  navbar: async (req, res) => {
    const navbarData = await NavbarData.find({})
    res.apiSuccess(navbarData)
  },
  settings: async (req, res) => {
    const settingsData = await SettingsData.find({})
    res.apiSuccess(settingsData)
  }
}
