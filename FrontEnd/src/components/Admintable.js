// Admintable.js
import React from 'react';
import './assets/Admintable.css';
import { useState } from 'react';
import UpdateModal from './UpdateModal';

const Admintable = ({ package_name, package_description, package_count, package_cost, file_name, fetchPackages }) => {
    const deletepackage = async () => {
        try {
            const response = await fetch(`http://localhost:5002/api/admin/delete/${package_name}`);
            if (response.ok) {
                const data = await response.json();
                fetchPackages();
            } else {
                console.error('Failed to fetch packages:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdate = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchPackages();

    };
    const [formData, setformdata] = useState({
        'package_name': package_name, 'package_description': package_description, 'package_count': package_count, 'package_cost': package_cost, 'file_name': file_name
    })
    return (
        <tr>
            <td>{package_name}</td>
            <td>{package_description}</td>
            <td>{package_count}</td>
            <td>{package_cost}</td>
            <td><img src={`http://localhost:5002/api/travel/image/${file_name}`} alt={package_name} /></td>
            <td>
                <div className='deleandupdatediv'>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={deletepackage}>Delete</button>
                </div>
                {isModalOpen && (
                    <UpdateModal formData={formData} package_name={package_name} onClose={handleCloseModal} onUpdate={fetchPackages} />
                )}
            </td>
        </tr>
    );
};

export default Admintable;
