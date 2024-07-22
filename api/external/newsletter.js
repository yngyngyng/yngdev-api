const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')
const SubscribeService = require('../../services/subscribeService')

router.post(
  '/subscribe',
  asyncHandler((req, res) => {
    return SubscribeService.subscribeToNewsletter(req, res)
  })
)

module.exports = router
