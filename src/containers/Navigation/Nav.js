import React from 'react';
import logo from '../../images/icon.png';
import './Nav.css';
import { connect } from 'react-redux';

const Nav = (props) => {
    const navStyle = {
        color: 'white'
    }
    const style = {
        width: 50,
        height: 50,
        marginTop: 5
    }
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                aria-label="Toogle Navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <p className="para"><img src={logo} style={style} /><span> </span>
                    Kodai Undi</p>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/about">About Us</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/services">Foods</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/products">Products</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/accomodation">Hotels</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/shoot">Shoots</a>
                    </li>
                    {/* <li className="nav-item active">
                        <a className="nav-link" href="/contact">Contact Us</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/news">News Blog</a>
                    </li> */}
                    {/* <Link style={navStyle} to="/ordersList">
                    <li>Orders List</li>
                </Link>
                <Link style={navStyle} to="/addMenu">
                    <li>Add Menu</li>
                </Link>
                <Link style={navStyle} to="/feedback">
                    <li>Feedbacks</li>
                </Link>
                <Link style={navStyle} to="/news">
                    <li>Add News</li>
                </Link> */}
                </ul>
            </div>
            <div>
                    <ul className="navbar-nav ml-auto">
                        {!props.isAuthenticated
                        ? <li className="nav-item active">
                            <a className="nav-link" href="/auth">Login</a>
                            </li>
                        : <li className="nav-item active">
                        <a className="nav-link" href="/logout">Logout</a>
                        </li> }
                    </ul>
                    </div>
            </nav>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Nav);