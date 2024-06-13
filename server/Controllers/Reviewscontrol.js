const Reviews = require('../models/reviews')


const createreview = async (req, res) => {
    console.log("got review")
    const usernamefromvalidation = req.user.User.username
    const { message } = req.body

    const review = await Reviews.create(
        {
            username: usernamefromvalidation,
            message: message,
        }
    )

    if (review) {
        res.status(200).end()
        console.log("res sent")
    }
    else {
        res.status(401).end()
    }
}


const getallreview = async (req, res) => {
    try {
        console.log("Sending all reviews");

        // Fetch all reviews from the database
        const allReviews = await Reviews.find();
        console.log('allReviews:', allReviews)
        // Send the reviews back to the client
        res.status(200).json(allReviews);
    } catch (error) {
        // Handle any errors that occur during the retrieval process
        console.error("Error retrieving reviews:", error);
        res.status(500).send("Internal Server Error");
    }

}



module.exports = { createreview, getallreview }