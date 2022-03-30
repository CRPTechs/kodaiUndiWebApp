import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Footer(props) {
    return (
        <div className="main-footer">
            <div className="container footerContent">
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