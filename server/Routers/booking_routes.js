const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/validateToken');
const { bookingcontrol, makepayment, paymentstatus } = require('../Controllers/bookingcontrol');
const yourbooking = require('../Controllers/yourbooking')
const Bookings = require('../models/bookings')

router.route('/book').post(validateToken, bookingcontrol);

//for getting user bookings
router.route('/yourbookings').get(validateToken, yourbooking)

//for payment 
router.route('/payment').post(validateToken, makepayment)

router.route('/approvepayment').post(validateToken, paymentstatus)
module.exports = router