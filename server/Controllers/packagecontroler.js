const asyncHandler = require("express-async-handler");


const Package = require('../models/packages');
const createPackage = asyncHandler(async (req, res) => {
    try {
        // Check if file was provided in the request
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Extract form fields from request body
        const { packageName, description, totalCost } = req.body;

        // Extract filename from req.file
        const imageUrl = req.file.filename;

        // Create a new package using the create method
        await Package.create({
            package_name: packageName,
            package_description: description,
            package_cost: totalCost,
            package_count: 1,
            imageUrl: imageUrl,
            imagename: req.file.originalname // Add filename to the database
        });

        return res.status(200).json({ message: 'Package created successfully' });
    } catch (error) {
        console.error('Error creating package:', error);
        return res.status(500).json({ error: 'Failed to create package' });
    }
})

const Deletepackage = asyncHandler(async (req, res) => {

    try {
        const deletedPackage = await Package.findOneAndDelete({ package_name: req.params.package_name });

        if (!deletedPackage) {
            return res.status(404).json({ error: "Package not found" });
        }

        return res.status(200).json({ message: "Package deleted successfully", deletedPackage });
    } catch (error) {
        console.error("Error deleting package:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
)

// Controller function to update a package
const updatePackage = asyncHandler(async (req, res) => {
    const { package_name } = req.params;
    const { newpackage_name, description, total_count, package_cost } = req.body;

    try {
        let updateFields = {
            package_name: newpackage_name,
            package_description: description,
            package_count: total_count,
            package_cost: package_cost,
        };

        if (req.file) {
            updateFields.imageUrl = req.file.filename;
            updateFields.imagename = req.file.originalname;
        }

        const updatedPackage = await Package.findOneAndUpdate(
            { package_name }, // Find the package by its name
            updateFields,
            { new: true }
        );

        if (!updatedPackage) {
            return res.status(404).json({ error: "Package not found" });
        }

        return res.status(200).json({ message: "Package updated successfully", updatedPackage });
    } catch (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
})


//get all packages
const getallpackages = asyncHandler(async (req, res) => {
    try {
        const packages = await Package.find(); // Find all packages in the Package collection
        // Map over the packages and add the image URLs
        const packagesWithImages = packages.map(package => {
            const imageUrl = `./uploads/${package.filename}`; // Construct the image URL
            return {
                ...package.toJSON(), // Convert package to JSON
                imageUrl: imageUrl // Add the imageUrl property
            };
        });
        res.json(packagesWithImages); // Send the packages with image URLs as JSON response
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
}
)

module.exports = { createPackage, Deletepackage, updatePackage, getallpackages };