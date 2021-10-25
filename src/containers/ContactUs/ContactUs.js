import React from 'react';
import underline from '../../images/underline.png';
import './ContactUs.css';

const Contact = () => {
    return (
        <div className="contactContainer">
            <div className="formContainer">
                <h2 className="formContainerHeader">Contact</h2>
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
                <h4 className="addressContainerHeader">Address Details</h4>
                <ul className="list-unstyled">
                    <li>Kodai Undi</li>
                    <li>Unit of CRP Culinary Private Limited,</li>
                    <li>4/102A, Main Road, Viraganoor, Madurai-625009.</li>
                    <li>Tamilnadu, India</li>
                </ul>
                <div className="connectContainer">
                        <h4 className="connectContainerHeader">Connect with us</h4>
                        <ul className="list-unstyled">
                            <li className="nav-item active">
                                <a className="nav-link" href="https://www.facebook.com/crp.undi.5">Facebook</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="https://www.instagram.com/kodaiundi/?hl=en">Instagram</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Twitter</a>
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
