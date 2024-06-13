// UpdateModal.js
import React, { useState, useEffect } from 'react';
import './assets/updatemodel.css'

const UpdateModal = ({ formData, package_name, onClose, onUpdate }) => {
    const [formData1, setFormData] = useState({
        package_name: package_name,
        description: formData.package_description,
        total_count: formData.package_count,
        package_cost: formData.package_cost,
        packageImage: null
    });
    useEffect(() => {
        setFormData({
            package_name: package_name || '',
            description: formData.package_description || '',
            total_count: formData.package_count || 0,
            package_cost: formData.package_cost || 0,
            packageImage: null
        });
    }, [package_name, formData]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData1, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('newpackage_name', formData1.package_name);
            formDataToSend.append('description', formData1.description);
            formDataToSend.append('total_count', formData1.total_count);
            formDataToSend.append('package_cost', formData1.package_cost);
            formDataToSend.append('packageImage', formData1.packageImage);

            const response = await fetch(`http://localhost:5002/api/admin/update/${package_name}`, {
                method: 'PUT',
                body: formDataToSend
            });

            if (response.ok) {
                console.log('Package updated successfully');
            } else {
                console.error('Failed to update package:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating package:', error);
        }

        await onUpdate();
        onClose();
    };




    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData1, packageImage: file });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}></span>

                <form onSubmit={handleSubmit}>
                    <div className='updateModeldiv'>
                        <h2>Update Package</h2>

                        <label htmlFor="packageName">New Package Name:</label>
                        <input type="text" id="packageName" name="package_name" value={formData1.package_name} onChange={handleChange} required />

                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={formData1.description} onChange={handleChange} required />

                        <label htmlFor="totalCount">Total Count:</label>
                        <input type="number" id="totalCount" name="total_count" value={formData1.total_count} onChange={handleChange} required />

                        <label htmlFor="totalCost">Total Cost:</label>
                        <input type="number" id="totalCost" name="package_cost" value={formData1.package_cost} onChange={handleChange} required />

                        <label htmlFor="packageImage">Image:</label>
                        <input type="file" id="packageImage" name="packageImage" onChange={handleChangeImage} accept="image/*" />

                        <button type="submit" >Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
