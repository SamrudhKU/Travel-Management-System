import React from 'react';
import './assets/packagecard.css';
import { useState, useEffect } from 'react'

const PackageCard = ({ package_name, package_description, package_count, package_cost, file_name, is_Open, set_IsOpen, setForm_Databook, setlogin, islogin, istokenvalid, settokenvalid }) => {

    const bookingoperation = async () => {
        await set_IsOpen(true)
        await setForm_Databook({
            packageName: package_name,
            dateOfTrip: ''
        });

    }

    return (
        <div>
            <div className='cardbox'>
                <div className='headingbox'><h2>{package_name}</h2></div>

                <div className='imagebox'>
                    <img src={`http://localhost:5002/api/travel/image/${file_name}`} alt={package_name} /> {/* Use the constructed image URL */}
                </div>
                <div>Description:{package_description}</div>
                <div className='ratingbox'><h3>Total Bookings: </h3>{package_count} </div>
                <div className='captionbox'><h2 id="priceRS">Rs</h2> {package_cost}</div>
                <div className='Book'><button onClick={() => bookingoperation()}>BOOK Now</button></div> {/* Corrected the onClick function */}
            </div>



        </div >



    );
};

export default PackageCard;
