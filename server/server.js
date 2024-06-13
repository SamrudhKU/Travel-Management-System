const express = require('express');
const connectDb = require('./Config/dbconfig');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const Package = require('./models/packages')
const jwt = require('jsonwebtoken')
const validateToken = require('./middleware/validateToken');
const Bookings = require('./models/bookings')
const app = express();

require('dotenv').config({ path: './config/.env' });
const cors = require('cors');
const { makepayment } = require('./Controllers/bookingcontrol');
app.use(cors());

// Connection to database
connectDb();



// Middleware to parse JSON request bodies
app.use(express.json({ limit: '10mb' })); // Increase the limit for JSON requests


app.use("/api/travel", require('./Routers/Userroutes'))


// Apply the admin routes to the desired path
app.use("/api/admin", require('./Routers/adminroutes'))
app.post("/payment", async (req, res) => {

    console.log('Request body:', req.body);

    try {
        const { transactionid, id } = req.body; // Access makepayement from req.body
        console.log('Request body:', req.body);

        let updateFields = {
            makepayement: true, // Toggle the value of makepayement
            upiid: transactionid
        }

        const updatedPackage = await Bookings.findOneAndUpdate(
            { _id: id }, // Find the package by its ID
            updateFields,
            { new: true }
        );
        console.log('Updated package:', updatedPackage);

        if (updatedPackage) {
            console.log("Updated Transaction ID")
            return res.status(200).end();
        } else {
            return res.status(404).end("Package not found"); // Adjust status and message based on your application logic
        }
    } catch (error) {
        console.error('Error in approvebooking:', error);
        return res.status(500).end("Internal Server Error"); // Return a generic error message
    }
})

app.use('/api/userbooking', require('./Routers/booking_routes'),)


//for payment approve

//for token validation checking
app.get('/api/checkvalid', require('./middleware/validateToken'), (req, res) => {
    console.log("valid")
    res.status(200).end()
})



//for error handling
app.use(require('./middleware/errorHandler'))

app.listen(process.env.PORT, () => {
    console.log('Server is up and listening at port:', process.env.PORT);
});

