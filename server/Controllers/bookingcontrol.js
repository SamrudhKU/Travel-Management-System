const asyncHandler = require("express-async-handler");


//for updating booking count
const Bookings = require('../models/bookings');
const Package = require('../models/packages');

const bookingcontrol = asyncHandler(async (req, res) => {
    if (req.user) {
        console.log('Booked in the name of user:', req.user.User);
        const username = req.user.User.username; // Declare username with const
        console.log("Username:", username);
        console.log("Request body:", req.body);

        const { packageName, dateOfTrip, mobilenumber } = req.body.formData;

        try {
            const booking = await Bookings.create({
                packageName: packageName,
                username,
                mobile: mobilenumber,
                dateOfTrip: dateOfTrip
            });

            if (booking) {
                console.log("Booking created successfully.");
                // Increment package count
                const package_before = await Package.findOne({ package_name: packageName });
                if (package_before) {
                    const updatedPackage = await Package.findOneAndUpdate(
                        { package_name: packageName },
                        { $inc: { package_count: 1 } },
                        { new: true }
                    );
                    if (updatedPackage) {
                        console.log("Package count updated successfully.");
                        return res.status(200).end();
                    }
                } else {
                    console.log("Package not found.");
                    return res.status(404).end("Package not found.");
                }
            } else {
                console.log("Error in creating booking.");
                return res.status(401).end("Error in creating booking.");
            }
        } catch (error) {
            console.log("Error:", error.message);
            return res.status(500).end("Internal Server Error");
        }
    } else {
        console.log('User information not found in the token');
        return res.status(401).end("Unauthorized");
    }
});
const getallbookings = asyncHandler(async (req, res) => {
    try {
        const bookingdata = await Bookings.find()
        if (bookingdata) {
            res.status(200).json(bookingdata);
        }
        else {
            res.status(401).end()
        }
    }
    catch (e) {
        console.log(e)
    }
}
)

//for approving booking 
const approvebooking = asyncHandler(async (req, res) => {
    try {
        const { approvedata, package_id } = req.body;
        console.log('Request body:', req.body);

        let updateFields = {
            approved: !approvedata,
        }

        const updatedPackage = await Bookings.findOneAndUpdate(
            { _id: package_id }, // Find the package by its ID
            updateFields,
            { new: true }
        );
        console.log('Updated package:', updatedPackage);

        if (updatedPackage) {
            return res.status(200).end();
        } else {
            return res.status(404).end("Package not found"); // Adjust status and message based on your application logic
        }
    } catch (error) {
        console.error('Error in approvebooking:', error);
        return res.status(500).end("Internal Server Error"); // Return a generic error message
    }
}
)

//for rejecting booking 
const rejectbooking = asyncHandler(async (req, res) => {
    try {
        const { rejecteddata, package_id } = req.body;
        console.log('Request body:', req.body);

        let updateFields = {
            rejected: !rejecteddata,
        }

        const updatedPackage = await Bookings.findOneAndUpdate(
            { _id: package_id }, // Find the package by its ID
            updateFields,
            { new: true }
        );
        console.log('Updated package:', updatedPackage);

        if (updatedPackage) {
            console.log("rejected")
            return res.status(200).end();
        } else {
            return res.status(404).end("Package not found"); // Adjust status and message based on your application logic
        }
    } catch (error) {
        console.error('Error in approvebooking:', error);
        return res.status(500).end("Internal Server Error"); // Return a generic error message
    }
}
)

const makepayment = asyncHandler(async (req, res) => {
    try {
        const { transactiontid, id } = req.body; // Access makepayement from req.body
        console.log('Request body:', req.body);

        let updateFields = {
            makepayement: true, // Toggle the value of makepayement
            upiid: transactiontid
        }

        const updatedPackage = await Bookings.findOneAndUpdate(
            { _id: id }, // Find the package by its ID
            updateFields,
            { new: true }
        );
        console.log('Updated package:', updatedPackage);

        if (updatedPackage) {
            console.log("rejected")
            return res.status(200).end();
        } else {
            return res.status(404).end("Package not found"); // Adjust status and message based on your application logic
        }
    } catch (error) {
        console.error('Error in approvebooking:', error);
        return res.status(500).end("Internal Server Error"); // Return a generic error message
    }
});


//For rejecting payment

const paymentstatus = asyncHandler(async (req, res) => {
    try {
        const { approvedata, package_id } = req.body;
        console.log('Request body:', req.body);

        let updateFields = {

            paymentstatus: !approvedata,
        }

        const updatedPackage = await Bookings.findOneAndUpdate(
            { _id: package_id }, // Find the package by its ID
            updateFields,
            { new: true }
        );
        console.log('Updated package:', updatedPackage);

        if (updatedPackage) {
            console.log("rejected")
            return res.status(200).end();
        } else {
            return res.status(404).end("Package not found"); // Adjust status and message based on your application logic
        }
    } catch (error) {
        console.error('Error in approvebooking:', error);
        return res.status(500).end("Internal Server Error"); // Return a generic error message
    }
}
)
module.exports = { bookingcontrol, getallbookings, approvebooking, rejectbooking, makepayment, paymentstatus }



