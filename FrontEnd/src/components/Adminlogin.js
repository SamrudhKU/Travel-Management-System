import React, { useState } from 'react';
import './assets/adminlog.css';

const Adminlogin = ({ adminlogincheck, setadminlogincheck }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [islogininvaid, setlogininvalid] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5002/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Extract access token from response body
                const data = await response.json();
                const AdminaccessToken = data.AdminaccessToken;
                setadminlogincheck(true)
                console.log('Log-in successful');
                localStorage.setItem('AdminaccessToken', AdminaccessToken); // Store access token
                setadminlogincheck(true)
                setlogininvalid(false);
            } else {
                // Failed sign-in, handle error
                console.error('Log-in failed');
                setadminlogincheck(false)
                setlogininvalid(true)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };




    return (
        <div className='container11'>
            <div className='container2'>
                <div className="signin-container">
                    <h2>Admin Log In</h2>

                    {!adminlogincheck && <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username" style={{ color: 'black' }}>Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" style={{ color: 'black' }}>Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>{islogininvaid && <h4 id='already'>Invalid Username or password</h4>}</div>
                        <div className="submitdiv">
                            <button type="submit">Log In</button>
                        </div>
                    </form>}
                </div>
            </div>
        </div>
    )
}
export default Adminlogin