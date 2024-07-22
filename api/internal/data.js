const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')
const DataService = require('../../services/dataService')

router.get(
  '/colors',
  asyncHandler((req, res) => {
    return DataService.colors(req, res)
  })
)

router.get(
  '/footer',
  asyncHandler((req, res) => {
    return DataService.footer(req, res)
  })
)

router.get(
  '/products',
  asyncHandler((req, res) => {
    return DataService.products(req, res)
  })
)

router.get(
  '/hero',
  asyncHandler((req, res) => {
    return DataService.hero(req, res)
  })
)

router.get(
  '/navbar',
  asyncHandler((req, res) => {
    return DataService.navbar(req, res)
  })
)

router.get(
  '/settings',
  asyncHandler((req, res) => {
    return DataService.settings(req, res)
  })
)

module.exports = router
