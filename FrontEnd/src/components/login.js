import React, { useState } from 'react';
import './assets/signin.css';
import { Link } from 'react-router-dom';

const Login = ({ islogin, setlogin }) => {
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
            const response = await fetch('http://localhost:5002/api/travel/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Extract access token from response body
                const data = await response.json();
                const accessToken = data.accessToken;
                setlogin(true)
                console.log('Log-in successful');
                localStorage.setItem('accessToken', accessToken); // Store access token
                setlogin(true)
                setlogininvalid(false);
            } else {
                // Failed sign-in, handle error
                console.error('Log-in failed');
                setlogin(false)
                setlogininvalid(true)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlelogout = async () => {
        setlogin(false)
        localStorage.setItem('accessToken', '');
    }


    return (
        <div className='container1'>
            <div className='container2'>
                <div className="signin-container">
                    <h2>Log In</h2>
                    {islogin && <div className="afterlogin"><h3 id='acc'>Logged IN </h3>
                        <button id="logoutbtn" onClick={() => handlelogout()}>Logout</button>
                    </div>
                    }
                    {!islogin && <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
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
                            <label htmlFor="password">Password:</label>
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
                    <div>
                        <h3>Dont have Account?<Link to="/signin" style={{ textDecoration: 'none' }}> Create</Link>
                        </h3>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Login