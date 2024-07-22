
<div align="center">
<img src="https://i.imgur.com/Lmtb4Wx.png">
  <h1>yngdev API v1</h1>
  <p></p>
  <img src="https://img.shields.io/badge/stability-dev-orange.svg" alt="Experimental">
  <img  src="https://github.com/neonet-net/yngdev-api/actions/workflows/deploy-to-prod.yml/badge.svg" alt="prod deploy">
  <br><br>
</div>

## Local Setup

- Clone the repo
- Use `npm install` to install dependencies
- Use `node app.js` to run local instance on **http://localhost:4000**

## Requirements for Data Fetching

- MongoDB instance up and running with data
  - Look at schema or code in front-end for details on structure
- Connection string for MongoDB
- We rely on some external services
    - Gumroad - for fetching products (needs API key)
    - Beehiiv - for subscribing to newsletter (needs API key)
    - Medium - for fetching articles (public API)

## Security

- Rate limiter
- Hard-coded UUID token (not super secure as anyone with network inspector can see token when calling from front-end), but still will return 401s to bots that do not set it
  - Token is set during deployment and is passed per image, so it's different on test and prod environments

## Deployment

- Deployment is done using Docker
- Dockerfile serves as a source of truth for creating the image
  - Within Dockerfile we are passing all the secrets and variables for our image to use either during creation or during runtime

## Deployment Requirements

- Private docker registry or dockerhub account
- This specific repo uses private docker registry, setup using secrets within the repository itself

## Github Actions

### deploy-to-test.yml

- Will push image to private Docker Registry using Docker Build & Push action
- Image will have test tag appended, but it can easily be changed in `deploy-to-test.yml`
- Deployment environment checks regularly if new version of image is available and deploys the newest image

### deploy-to-prod.yml

- Will push image to private Docker Registry using Docker Build & Push action
- Image has production image tag, but it can easily be changed in `deploy-to-test.yml`
- Deployment environment checks regularly if new version of image is available and deploys the newest image

## PR & Merging

- When making changes create own branch
- In PR Use Action `Deploy to DEV` which will deploy the changes from that branch to **https://api.yngdev-dev-test.neo-net.net/** for testing and verification purposes

## Deployment

- Deployment to the live environment **https://api.yngdev.com** is done automatically upon merge to `master` using Github Action
- To avoid production damage, please use the test environment prior to deploying

## Built With

![Static Badge](https://img.shields.io/badge/Express-%23000000?style=plastic&logo=express&labelColor=black)
![Static Badge](https://img.shields.io/badge/Nodejs-%23339933?style=plastic&logo=nodedotjs&labelColor=black)