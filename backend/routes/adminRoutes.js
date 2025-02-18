const express = require('express');
const { getAllUserLists } = require('../controllers/admin/userLists')

const router = express.Router();

router.get("/getAllUserLists", getAllUserLists)

module.exports = router;
