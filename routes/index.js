const express = require('express')
const router = express.Router()

// Welcome Pager
router.get('/', (req, res) => res.render('partials/welcome'));

module.exports = router
