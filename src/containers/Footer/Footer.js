import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Footer(props) {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>Get to know us</h4>
                        <ul className="list-unstyled">
                            <li className="nav-item active">
                                <a className="nav-link" href="/about">About Us</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/contact">Contact Us</a>
                            </li>
                            {/* <li className="nav-item active">
                                <a className="nav-link" href="/news">News Blog</a>
                            </li> */}
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Terms and Conditions</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>Connect with us</h4>
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
                        </ul>
                    </div>
                    <div className="col">
                        <h4>Let us help you</h4>
                        <ul className="list-unstyled">
                            {props.isAuthenticated
                                ? <li className="nav-item active">
                                    <a className="nav-link" href="/userOrders">Your Orders</a>
                                </li>
                                : null}
                            <li className="nav-item active">
                                <a className="nav-link" href="https://play.google.com/store/apps/details?id=com.nirmaal.kodaiundi">Undi app download</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/help">Help</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>Address Details</h4>
                        <ul className="list-unstyled">
                            <li>Kodai Undi</li>
                            <li>Unit of CRP Culinary Private Limited,</li>
                            <li>4/102A, Main Road, Viraganoor, Madurai-625009.</li>
                            <li>Tamilnadu, India</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} CRP Culinary Private Limited | All rights reserved | Terms of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps, null)(Footer);