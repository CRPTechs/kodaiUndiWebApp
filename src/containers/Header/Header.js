import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../../images/logo.png';
import { useHistory } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const history = useHistory();
    const openOrders = () => {
        history.push('/orders');
    }
    const goToHome = () => {
        history.push('/');
    }
    return (
        <div className="homeContainer"> 
            <div className="homeHeaderLeft">
                {/* <FaFacebookF className="fbLogo" />
                <FaTwitter className="twitterLogo" />
                <FaInstagram className="instaLogo" /> */}
                <span className="contactSpan">+91 9442777047</span>
                <span className="mailSpan">support@kodaiundi.in</span>
            </div>
            <div className="homeHeaderRight" onClick={goToHome}>
                <img src={logo} className="headerLogo" />
                {/* <span className="undiName"><strong>Kodai Undi</strong></span> */}
            </div>
            <div className="homeHeaderButton">
                <button className="homeOrderButton" onClick={openOrders}>Make Orders</button>
            </div>
        </div>
    )
}

export default Header;