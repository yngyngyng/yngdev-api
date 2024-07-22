const axios = require('axios')

module.exports = {
  getArticles: async (req, res) => {
    const requestUrl = process.env.MEDIUM_URL

    const request = {
      method: 'get',
      url: requestUrl
    }

    axios
      .request(request)
      .then((response) => {
        if (response.status === 200) {
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
