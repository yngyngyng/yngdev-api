const axios = require('axios')

module.exports = {
  subscribeToNewsletter: async (req, res) => {
    const subscribeUrl = `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUB_ID}/subscriptions`
    const token = `Bearer ${process.env.BEEHIIV_API_KEY}`

    const email = req.body.data.email
    const sendWelcomeMail = req.body.data.send_welcome_email
    const utmSource = req.body.data.utm_source
    const utmMedium = req.body.data.utm_medium
    const referringSite = req.body.data.referring_site

    if (!email) return res.apiError(400, 'Email Address is required')

    const data = JSON.stringify({
      email: email,
      send_welcome_email: sendWelcomeMail,
      utm_source: utmSource,
      utm_medium: utmMedium,
      referring_site: referringSite
    })

    const forward = {
      method: 'post',
      url: subscribeUrl,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: data
    }

    axios
      .request(forward)
      .then((response) => {
        if (response.status === 201) {
          res.apiSuccess('Success!')
        }
      })
      .catch(() => {
        res.apiError(
          'Oops, this did not work and it is most likely our fault, try again or contact administrator...'
        )
      })
  }
}
