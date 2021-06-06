const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const ContactController = require("../controller").contacts;

router.get('/', ContactController.getContacts);
router.post('/',ContactController.postContact)

module.exports = router