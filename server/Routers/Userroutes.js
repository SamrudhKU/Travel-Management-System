const express = require('express')
const router = express.Router()
const { registerUser, login } = require('../Controllers/UserController');
const validateToken = require('../middleware/validateToken');
const { getallpackages } = require('../Controllers/packagecontroler');
const { createreview, getallreview } = require('../Controllers/Reviewscontrol')
const path = require('path');

router.get('/all/packages', getallpackages)

const fs = require('fs');

router.get('/getReviews', getallreview)



// Endpoint to serve image data
router.get('/image/:filename', (req, res) => {

    const filename = req.params.filename;
    const imagePath = path.join('./uploads', filename); // Assuming the image is stored in the 'uploads' directory

    // Read the image file
    fs.readFile(imagePath, (err, data) => {
        if (err) {
            console.error('Error reading image file:', err);
            return res.status(500).json({ error: 'Failed to read image file' });
        }

        // Send the image data as response
        res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Adjust the content type based on your image format
        res.end(data);
    });
});


router.post("/signin", registerUser);
router.post("/login", login)
router.get("/:id", validateToken,)


//for Reviews
router.post('/Reviews', validateToken, createreview)



module.exports = router;


