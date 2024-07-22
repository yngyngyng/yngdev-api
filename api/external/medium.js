const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')
const MediumService = require('../../services/mediumService')

router.get(
  '/articles',
  asyncHandler((req, res) => {
    return MediumService.getArticles(req, res)
  })
)

module.exports = router
