import React from 'react';
import './Help.css';

const Help = (props) => {
    return (
        <div className="Help">
            <a href="/changePassword">
            <div className="anchorBox">
                <h4>Account Settings</h4>
                <p>Change your password, Forgot password</p>
            </div>
            </a>
        </div>
    )
};

export default Help;