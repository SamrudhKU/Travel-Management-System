import React, { useState, useEffect } from 'react';
import PackageCard from './PackageCard';
import './assets/packages.css';
import './assets/bookdialogue.css'
import { Link } from 'react-router-dom';
import Trcomponent from './trcomponent';
const usernameimage = require('./assets/IMAGES/image.png');

const PackagesComponent = ({ islogin, setlogin, istokenvalid, settokenvalid }) => {
    const [packages, setPackages] = useState([]);
    const [booked, setbooked] = useState(false)

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


    //for booking dialogue
    const [isOpen, setIsOpen] = useState(false);
    const toggleDialog = () => {
        setIsOpen(!isOpen);
        setbooked(false)
    };

    const [formDatabook, setFormDatabook] = useState({
        packageName: '',
        dateOfTrip: '',
        mobilenumber: ''

    });


    const handleChangebook = (e) => {
        const { name, value } = e.target;
        setFormDatabook({
            ...formDatabook,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken !== "") {
                // Make the fetch request with the access token and package name
                const response = await fetch(`http://localhost:5002/api/userbooking/book`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        formData: formDatabook
                        // Other booking details if needed
                    })
                });

                // Check if the response is successful (status code 200-299)
                if (response.ok) {
                    setlogin(true)

                    // for displaying updated package count after booking
                    fetchPackages()

                    // Handle the response data (if needed)
                    console.log('Booking successful:');

                    // Optionally, clear the form fields
                    setFormDatabook({
                        packageName: '',
                        dateOfTrip: '',
                        mobilenumber: ''
                    });

                    // display booked succcessfully
                    setbooked(true)

                } else {
                    setlogin(false)

                    // Handle error response
                    console.error('Booking failed:', response.statusText);
                    // return null; // Or throw an error
                }
            }
        } catch (error) {
            // Handle fetch error
            console.error('Fetch error:', error);
            // return null; // Or throw an error
        }


    };


    // for displaying your bookings
    const [bookingData, setBookingData] = useState([]);
    const [btnfetchbooking, setbtnfetchbooking] = useState(false)
    const togglefetchbooking = async () => {
        await setbtnfetchbooking(!btnfetchbooking)
    }

    const fetchyourbooking = async () => {
        await togglefetchbooking()
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken !== "") {
            try {
                // Make the fetch request with the access token and package name
                const response = await fetch('http://localhost:5002/api/userbooking/yourbookings', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setBookingData(data); // Set the booking data after the response is received

            }
            catch (error) {
                // Handle fetch error
                console.error('Fetch error:', error);
                // return null; // Or throw an error
            }
        }
    }


    //for handling review

    const [reviewdata, setreviewdata] = useState({
        message: '',
    });
    const handlreviewchange = (e) => {
        const { name, value } = e.target;
        setreviewdata({
            ...reviewdata,
            [name]: value
        });
    };

    const handereviewsubmit = async (e) => {
        try {
            e.preventDefault();
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken !== "") {
                const response = await fetch('http://localhost:5002/api/travel/Reviews', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: reviewdata.message // Assuming reviewdata contains the message field
                    })
                });

                if (response.ok) {
                    setlogin(true);
                    setreviewdata({ message: '' }); // Clear the form by resetting reviewdata
                } else {
                    setlogin(false);
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    //for getting all reviews
    const [getreviewdata, segettreviewdata] = useState([]);
    const getallReviews = async () => {
        try {
            const response = await fetch('http://localhost:5002/api/travel/getReviews', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const jsondata = await response.json();
                segettreviewdata(jsondata); // Assuming setgettreviewdata is a typo and should be setgetreviewdata
            } else {
                // Handle non-200 response
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    useEffect(() => {
        getallReviews();
    }, []);

    //for payment
    const [transactiondata, settransactiondata] = useState({
        transactiontid: 'fgfhfhfh',
        id: ''
    });

    const handletChange = (e) => {
        const { name, value } = e.target;
        settransactiondata({
            ...transactiondata,
            [name]: value
        });
    };

    const handleTransactionidSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const response = await fetch('http://localhost:5002/payment', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json' // Set Content-Type header
                    },
                    body: JSON.stringify(transactiondata) // Send data as JSON string
                });
                console.log('Response:', response);
            } else {
                console.error('Access token not found');
            }
        } catch (error) {
            console.error('Error submitting transaction data:', error);
        }
    };


    return (

        <div className="packages-container">
            <div className='userbookingdiv'>
                {islogin && <div className='mainbookingdiv'>
                    <div><button onClick={() => fetchyourbooking()} >Your Bookings</button></div>
                    {btnfetchbooking &&
                        <div> <table id='yourbookings'>
                            <thead>
                                <tr>
                                    <th>Package Name</th>
                                    <th>Username</th>
                                    <th>Mobile</th>
                                    <th>Date of Trip</th>
                                    <th>Approved</th>
                                    <th>Rejected</th>
                                    <th>Make Payment</th>
                                    <th>Payment Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingData.map(booking => (
                                    <tr key={booking._id}>
                                        <td>{booking.packageName}</td>
                                        <td>{booking.username}</td>
                                        <td>{booking.mobile}</td>
                                        <td>{new Date(booking.dateOfTrip).toLocaleDateString()}</td>
                                        <td div style={{ backgroundColor: booking.approved ? 'greenyellow' : 'red' }}>{booking.approved ? 'Yes' : 'No'}</td>
                                        <td style={{ backgroundColor: booking.rejected ? 'greenyellow' : 'red' }}>{booking.rejected ? 'Yes' : 'No'}</td>

                                        {/* for transaction component */}
                                        <td style={{ backgroundColor: booking.makepayment ? 'greenyellow' : 'red' }}>
                                            {booking.approved && !booking.makepayement && (
                                                <div>
                                                    <form onSubmit={(e) => handleTransactionidSubmit(e)}>
                                                        <div id="bookform">
                                                            <label htmlFor="upi" style={{ color: 'white' }}>GPAY UPI id: owner@oksbi</label><br />
                                                            <label htmlFor="bookingid" style={{ color: 'white' }}>Booking ID:</label><br />

                                                            <input type="text" id="bookingid" name="bookingid" value={transactiondata.id = booking._id} readOnly /><br />

                                                            <label htmlFor="transactiontid" style={{ color: 'white' }}>Transaction id:</label><br />
                                                            <input id="transactiontid" name="transactiontid" required onChange={(e) => handletChange(e)} />

                                                            <button type="submit" >{booking.approved ? 'Make Payment' : 'Pay After Approval'}</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}
                                            {!booking.approved && (<button disabled={!booking.approved}>{booking.approved ? 'Make Payment' : 'Pay After Approval'}</button>)}
                                            {booking.approved && booking.makepayement && (<button disabled={!booking.makepayement}>{booking.makepayement && 'Payment Done'}</button>)}

                                        </td>
                                        <td style={{ backgroundColor: booking.paymentstatus ? 'green' : 'yellow' }}>{booking.paymentstatus ? 'Payment Approved' : 'Not Approved'}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    }
                </div>

                }
            </div>




            <div className='bookingdialogue'>
                {isOpen && (
                    <div className="dialog-box">
                        <h2>Book Now</h2>
                        {islogin && !booked &&
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div id="bookform">
                                    <label htmlFor="packageName" style={{ color: 'white' }}>Package Name:</label>
                                    <input type="text" id="packageName" name="packageName" value={formDatabook.packageName} onChange={(e) => handleChangebook(e)} readOnly /><br />
                                    <label htmlFor="mobilenumber" style={{ color: 'white' }}>Mobile Number :</label>
                                    <input type="number" id="mobilenumber" name="mobilenumber" onChange={(e) => handleChangebook(e)} required /><br />
                                    <label htmlFor="dateOfTrip" style={{ color: 'white' }}>Date of Trip:</label>
                                    <input type="date" id="dateOfTrip" name="dateOfTrip" value={formDatabook.dateOfTrip} onChange={(e) => handleChangebook(e)} required /><br /><br />
                                    <div ><button className='submit-btn' type="submit">Submit</button></div>
                                </div>
                            </form>}
                        {!islogin && (<div><h4>Please Login to Book</h4>
                            <Link to="/login" ><button className='login-btn'>Login</button></Link>
                        </div>)}
                        {booked && <h4>BOOKED SUCCESSFULLY</h4>}
                        <button className="close-btn" onClick={() => toggleDialog()}>Close</button>
                    </div>
                )}
            </div>

            <h2>Packages</h2>


            <div className='Packageitems'>
                {packages.map((packageData) => (
                    <PackageCard
                        key={packageData._id}
                        package_name={packageData.package_name}
                        package_description={packageData.package_description}
                        package_count={packageData.package_count}
                        package_cost={packageData.package_cost}
                        file_name={packageData.imagename}
                        is_Open={isOpen}
                        set_IsOpen={setIsOpen}
                        setForm_Databook={setFormDatabook}
                        setlogin={setlogin}
                        islogin={islogin}
                        istokenvalid={istokenvalid}
                        settokenvalid={settokenvalid}
                    />
                ))}
            </div>
            <div id="h3" >
                {islogin && <h3>Note: For cancellation please contact: 7878787878</h3>}
            </div>
            {/*  for making and  displaying reviews */}
            <div className='reviews'>
                <h2>Here are reviews</h2>
            </div>
            {islogin && (
                <form onSubmit={(e) => handereviewsubmit(e)} >
                    <label htmlFor="make">Add your Review</label>
                    <input id="make" name="message" required value={reviewdata.message} onChange={(e) => handlreviewchange(e)} />
                    <button type='submit'>Submit</button>
                </form>)
            }

            <div className='Reviews'>


                <table className='review'>
                    <tbody>
                        {getreviewdata.map((packageData, index) => (
                            <tr className="tr" key={index}>
                                <div className="reviewdiv">
                                    <div className='imagediv'>
                                        <td className='imagetd'>  <img src={usernameimage} alt='image'></img></td>
                                        <td>{packageData.username}</td>

                                    </div>
                                    <td><Trcomponent message={packageData.message} /></td>
                                </div>

                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div >
    );
};

export default PackagesComponent;
