const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item')

router.get('/', (req, res) => {
   const body = req.body;
   res.json({body})
})

module.exports = router;