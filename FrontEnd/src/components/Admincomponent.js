import React, { useState, useEffect } from 'react';
import './assets/Admincomponent.css';
import './Admintable'
import Admintable from './Admintable';

const Admincomponent = () => {

    const [dialogueOpen, setDialogueOpen] = useState(false);

    const [packages, setPackages] = useState([]);
    const fetchPackages = async () => {
        try {
            const response = await fetch('http://localhost:5002/api/travel/all/packages');
            if (response.ok) {
                const data = await response.json();
                setPackages(data);
            } else {
                console.error('Failed to fetch packages:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };


    useEffect(() => {
        fetchPackages();
    }, []);

    const openDialogue = (pkg) => {
        setDialogueOpen(true);
    };

    const closeDialogue = () => {
        setDialogueOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        await sendFormData(formData);
        await fetchPackages()
    };

    const sendFormData = async (formData) => {
        try {
            const response = await fetch('http://localhost:5002/api/admin/create', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Package created successfully');
                closeDialogue();
            } else {
                console.error('Failed to create package:', data.error);
            }
        } catch (error) {
            console.error('Error creating package:', error);
        }
    };


    //for displaying users bookings
    const [fetchbookingdialogue, togglefetchbookingdialogue] = useState(false)
    const [bookingdata, setbookingdata] = useState([])
    const togglefetchbooking = () => {
        togglefetchbookingdialogue(!fetchbookingdialogue)
    }
    const fetchyourbooking = async () => {
        await togglefetchbookingdialogue(true)
        const AdminaccessToken = localStorage.getItem('AdminaccessToken');
        if (AdminaccessToken !== "") {
            try {
                // Make the fetch request with the access token and package name
                const response = await fetch('http://localhost:5002/api/admin/userbookings', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${AdminaccessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                await setbookingdata(data); // Set the booking data after the response is received
                console.log(data)
            }
            catch (error) {
                // Handle fetch error
                console.error('Fetch error:', error);
                // return null; // Or throw an error
            }
        }
    }

    //for approving the bookings
    const approvebooking = async (approvedata, package_id) => {
        console.log('approvedata, package_id:', approvedata, package_id);

        // Retrieve AdminaccessToken from props, state, or wherever it's available
        const AdminaccessToken = localStorage.getItem('AdminaccessToken');

        if (AdminaccessToken) { // Check if AdminaccessToken exists
            try {
                const response = await fetch('http://localhost:5002/api/admin/approved', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${AdminaccessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ approvedata, package_id }) // Directly pass approvedata and package_id
                });

                if (response.ok) {
                    // Handle success response
                    await fetchyourbooking();
                } else {
                    console.error('Failed to approve booking. Status:', response.status);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        } else {
            console.error('AdminaccessToken not found in localStorage');
        }

    };

    //for rejecting booking


    const rejectbooking = async (rejecteddata, package_id) => {
        console.log('approvedata, package_id:', rejecteddata, package_id);

        // Retrieve AdminaccessToken from props, state, or wherever it's available
        const AdminaccessToken = localStorage.getItem('AdminaccessToken');

        if (AdminaccessToken) { // Check if AdminaccessToken exists
            try {
                const response = await fetch('http://localhost:5002/api/admin/rejected', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${AdminaccessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rejecteddata, package_id }) // Directly pass approvedata and package_id
                });

                if (response.ok) {
                    // Handle success response
                    await fetchyourbooking();
                } else {
                    console.error('Failed to approve booking. Status:', response.status);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        } else {
            console.error('AdminaccessToken not found in localStorage');
        }

    };


    //for approving payment

    //for approving the bookings
    const Approve_Payment = async (approvedata, package_id) => {
        console.log('approvedata, package_id:', approvedata, package_id);

        // Retrieve AdminaccessToken from props, state, or wherever it's available
        const AdminaccessToken = localStorage.getItem('AdminaccessToken');

        if (AdminaccessToken) { // Check if AdminaccessToken exists
            try {
                const response = await fetch('http://localhost:5002/api/userbooking/approvepayment', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${AdminaccessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ approvedata, package_id }) // Directly pass approvedata and package_id
                });

                if (response.ok) {
                    // Handle success response
                    await fetchyourbooking();
                } else {
                    console.error('Failed to approve booking. Status:', response.status);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        } else {
            console.error('AdminaccessToken not found in localStorage');
        }

    };

    return (
        <>

            <div id="Adminheading"><h1>Admin page</h1></div>

            <div className='container'>

                <div className='btns'>
                    {/* button for creating new package */}
                    <div className='menu'>
                        <div className='creatediv'>
                            <button className='btn1' onClick={() => openDialogue(null)}>Create New Package</button>
                        </div>
                    </div>

                    {/* button for updaing the bookings */}
                    <div className='menu'>
                        <div className='updatediv'>
                            <button className='btn1' onClick={() => fetchyourbooking(null)}>Handle Bookings</button>
                        </div>
                    </div>
                    {fetchbookingdialogue && <div><button onClick={() => togglefetchbooking()}>Close</button></div>
                    }

                </div>



                <div>{dialogueOpen && (

                    <div className="dialogue">
                        <div className="dialogue-content">

                            <span className="close" onClick={closeDialogue}>&times;</span>
                            <h2>Create New Package</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='createconatiner'>
                                    <label htmlFor="packageName">Package Name:</label>
                                    <input type="text" id="packageName" name="packageName" required />
                                    <label htmlFor="description" >Description:</label>
                                    <textarea id="description" name="description" required />
                                    <label htmlFor="totalCost">Total Cost:</label>
                                    <input type="number" id="totalCost" name="totalCost" required />
                                    <label htmlFor="packageImage">Image:</label>
                                    <input type="file" id="packageImage" name="packageImage" accept="image/*" required />
                                    <div id='createbtn'><button type="submit">Create</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                    <div className='handlebookingscontainer'>
                        {fetchbookingdialogue && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Package Name</th>
                                        <th>Username</th>
                                        <th>Mobile</th>
                                        <th>dateOfTrip</th>
                                        <th>Approve</th>
                                        <th>Reject</th>
                                        <th>Payment Done</th>
                                        <th>Transaction ID</th>
                                        <th>Approve Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookingdata.map((bpackageData) => (

                                        <tr>
                                            <td>{bpackageData.packageName} </td>
                                            <td>{bpackageData.username} </td>
                                            <td>{bpackageData.mobile} </td>
                                            <td>{bpackageData.dateOfTrip} </td>
                                            <td><button onClick={() => { approvebooking(bpackageData.approved, bpackageData._id) }} style={{ backgroundColor: bpackageData.approved ? 'greenyellow' : 'red' }}  >{bpackageData.approved ? 'yes' : 'No'}</button> </td>
                                            <td><button onClick={() => { rejectbooking(bpackageData.rejected, bpackageData._id) }} style={{ backgroundColor: bpackageData.rejected ? 'greenyellow' : 'red' }} >{bpackageData.rejected ? 'yes' : 'No'}</button> </td>
                                            <td><div style={{ backgroundColor: bpackageData.makepayement ? 'greenyellow' : 'red' }} >{bpackageData.makepayement ? 'yes' : 'No'}</div> </td>

                                            <td>{bpackageData.upiid} </td>
                                            <td><button onClick={() => {
                                                Approve_Payment(bpackageData.paymentstatus
                                                    , bpackageData._id)
                                            }} style={{ backgroundColor: bpackageData.paymentstatus ? 'greenyellow' : 'red' }} >{bpackageData.paymentstatus ? 'yes' : 'No'}</button> </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                    </div>

                    <table className='tableadmin'>
                        <thead>
                            <tr>
                                <th>Package Name</th>
                                <th>Description</th>
                                <th>Total Bookings</th>
                                <th>Cost</th>
                                <th>Image</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map((packageData) => (
                                <Admintable
                                    key={packageData._id}
                                    package_name={packageData.package_name}
                                    package_description={packageData.package_description}
                                    package_count={packageData.package_count}
                                    package_cost={packageData.package_cost}
                                    file_name={packageData.imagename}
                                    fetchPackages={fetchPackages}
                                />
                            ))}
                        </tbody>
                    </table>
                </div >

            </div >
        </>
    );
};

export default Admincomponent;
