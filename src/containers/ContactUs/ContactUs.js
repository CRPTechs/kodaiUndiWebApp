import React from 'react';
import underline from '../../images/underline.png';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneSquareAlt, FaMailBulk } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import './ContactUs.css';

const Contact = () => {
    return (
        <div className="contactContainer">
            <div className="formContainer">
                <h2 className="formContainerHeader">Contact:</h2>
                <img src={underline} className="imageUnderline" />
                <form className="contactForm">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="number" placeholder="Phone" />
                    <textarea placeholder="Message" />
                    <button className="submitButton">Submit</button>
                </form>
            </div>
            <div className="addressContainer">
            <h4 className="addressContainerHeader">Address Details:</h4>
                <div className='addressContainerDiv'>
                <ul className="list-unstyled">
                    <li>Kodai Undi</li>
                    <li><GoLocation /> Near Manor Bungalow, Lake Road,</li>
                    <li>Kodaikanal-624101.</li>
                    <li>Tamilnadu, India.</li>
                    <li><a href='tel: +91 9442777047'><FaPhoneSquareAlt /> +91 9442777047</a></li>
                    <li><a href='mailto:support@kodaiundi.in'><FaMailBulk /> support@kodaiundi.in</a></li>
                </ul>
                <p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d981.5816815208449!2d77.49284312090145!3d10.235210979455086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07676e9f9b6965%3A0xd256e2089dc84398!2sKodai%20Undi!5e0!3m2!1sen!2sin!4v1647843331722!5m2!1sen!2sin" style={{width:"300", height:"300",border:"0"}} allowfullscreen="" loading="lazy"></iframe></p>
                </div>
                <div className="connectContainer">
                    <h4 className="connectContainerHeader">Connect with us:</h4>
                    <ul className="list-unstyled">
                        <li className="nav-item active">
                            <a className="nav-link" href="https://www.facebook.com/crp.undi.5">
                                <FaFacebookF />
                                Facebook
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="https://www.instagram.com/kodaiundi/?hl=en">
                                <FaInstagram />
                                Instagram
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/">
                                <FaTwitter />
                                Twitter
                            </a>
                        </li>
                        {/* <li className="nav-item active">
                                <a className="nav-link" href="https://play.google.com/store/apps/details?id=com.nirmaal.kodaiundi">Undi app download</a>
                            </li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default Contact;
