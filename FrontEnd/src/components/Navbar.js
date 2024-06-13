import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './assets/Navbar.css';
import AboutComponent from './AboutComponent';
import PackagesComponent from './PackagesComponent';
import LoginComponent from './login';
import SignInComponent from './SignInComponent';
import Adminlogincomponent from './Adminlogincomponent';


const Navbar = () => {
    const [islogin, setlogin] = useState(false)
    const [istokenvalid, settokenvalid] = useState(true)

    return (
        <Router>
            <>
                <nav>
                    <div className='logodiv hove'>
                        <div className="logo">My TRip.com</div>
                    </div>

                    <div className="About">
                        <Link to="/about" ><button className='hove'>About</button></Link>
                    </div>
                    <div className="pack">
                        <Link to="/packages" ><button className='hove'>Packages</button></Link>
                    </div>
                    <div className="login">
                        <Link to="/login" ><button className='hove'>Login</button></Link>
                    </div>
                    <div className="Signin">
                        <Link to="/signin" ><button className='hove'>Sign Up</button></Link>
                    </div>
                </nav>


                <Routes>
                    <Route path="/about" element={<AboutComponent />} />
                    <Route path="/" element={<AboutComponent />} />
                    {/* <Route path="/admin" element={<Admincomponent />} /> */}
                    <Route path="/packages" element={<PackagesComponent islogin={islogin} setlogin={setlogin} istokenvalid={istokenvalid} settokenvalid={settokenvalid} />} />
                    <Route path="/login" element={<LoginComponent islogin={islogin} setlogin={setlogin} />} />
                    <Route path="/signin" element={<SignInComponent />} />
                    <Route path='/admin' element={<Adminlogincomponent />} />
                </Routes>

            </>
        </Router>
    );
};

export default Navbar;
