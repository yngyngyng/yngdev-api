const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')
const GumroadService = require('../../services/gumroadService')

router.get(
  '/products',
  asyncHandler((req, res) => {
    return GumroadService.getProducts(req, res)
  })
)

module.exports = router
