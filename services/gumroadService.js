const axios = require('axios')

module.exports = {
  getProducts: async (req, res) => {
    const requestUrl = 'https://api.gumroad.com/v2/products'

    const data = new URLSearchParams({
      access_token: process.env.GUMROAD_TOKEN
    })

    const request = {
      method: 'get',
      url: requestUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    }

    axios
      .request(request)
      .then((response) => {
        if (response.status == 200) {
          res.apiSuccess(response.data)
        }
      })
      .catch(() => {
        res.apiError(
          'Oops, this did not work and it is most likely our fault, try again or contact administrator...'
        )
      })
  }
}
