import React, { useEffect, useState } from 'react';
import Adminlogin from './Adminlogin';
import Admincomponent from './Admincomponent'
export const Adminlogincomponent = () => {
    // check for validation
    const [adminlogincheck, setAdminlogincheck] = useState(false);
    const fetchData = async () => {
        try {
            const AdminaccessToken = localStorage.getItem('AdminaccessToken')
            if (AdminaccessToken) {
                const response = await fetch('http://localhost:5002/api/checkvalid', {
                    method: 'GET', // specify the HTTP method (GET in this case)
                    headers: {
                        'Authorization': `Bearer ${AdminaccessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log("response:", response);

                if (response.ok) {

                    setAdminlogincheck(true);
                } else {
                    setAdminlogincheck(false);
                }
            } else {
                setAdminlogincheck(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {adminlogincheck && (
                <Admincomponent></Admincomponent>
            )}
            {!adminlogincheck && (<Adminlogin adminlogincheck={adminlogincheck} setadminlogincheck={setAdminlogincheck}></Adminlogin>)
            }
        </>
    );
};

export default Adminlogincomponent;
