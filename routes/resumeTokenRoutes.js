const express = require('express')
const router = express.Router()
const {getResumeToken} = require('../controllers/resumeTokenController')


router.get('/:token', getResumeToken)


module.exports = router