const asyncHandler = require("express-async-handler");


const Bookings = require('../models/bookings');

const yourbooking = asyncHandler(async (req, res) => {
    try {
        const username = req.user.User.username; // Assuming req.user.User is a string
        const booking_data = await Bookings.find({ username: username }); // Pass username as a string
        console.log("ALL Booked data:", booking_data);
        res.status(200).json(booking_data); // Sending booking data as JSON response
    } catch (error) {
        console.error("Error fetching booking data:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Sending error response
    }
})
module.exports = yourbooking;
