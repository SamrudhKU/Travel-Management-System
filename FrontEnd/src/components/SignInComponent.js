import React, { useState } from 'react';
import './assets/signin.css';


const SignInComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [issignedup, setsignup] = useState(false)
    const [isinvalidsignup, setinvalidsignup] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5002/api/travel/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Successful sign-in, handle accordingly (e.g., redirect)
                console.log('Sign-in successful');
                setsignup(true)
                setinvalidsignup(false)
            } else {
                // Failed sign-in, handle error
                console.error('Sign-in failed');
                setsignup(false)
                setinvalidsignup(true)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container1'>
            <div className='container2'>
                <div className="signin-container">
                    <h2>Sign Up</h2>
                    {issignedup &&
                        <h3 id="acc">Account Created</h3>
                    }
                    {!(issignedup) && <form onSubmit={handleSubmit}>
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
                        <div>{isinvalidsignup && <h4 id='already'>Username already exist</h4>}</div>
                        <div className="submitdiv">
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>}
                </div>
            </div>
        </div>
    )
}
export default SignInComponent