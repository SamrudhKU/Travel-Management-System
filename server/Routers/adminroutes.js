const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPackage, updatePackage, Deletepackage } = require('../Controllers/packagecontroler');
const { adminlogin } = require('../Controllers/adminlogin');
const { getallbookings, approvebooking, rejectbooking } = require('../Controllers/bookingcontrol');

// Define the storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    },
});

// Initialize multer with the storage configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit for file size
});

// Route to create a new package
router.post('/create', upload.single('packageImage'), createPackage);

//Route to delete a package
router.get('/delete/:package_name', Deletepackage)

// Route to update a package
router.put('/update/:package_name', upload.single('packageImage'), updatePackage);



//route for adminlogin
//@public
//Route to delete a package
router.post('/login', adminlogin)

//for getting all user booked packages
router.get('/userbookings', require('../middleware/validateToken'), getallbookings)


//for approving  bookings
router.post('/approved', require('../middleware/validateToken'), approvebooking)

//for rejecting  bookings
router.post('/rejected', require('../middleware/validateToken'), rejectbooking)


module.exports = router;


