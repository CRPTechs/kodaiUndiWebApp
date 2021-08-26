import React, { Component } from 'react';
import * as authAction from '../../../store/authAction';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component {
    componentDidMount () {
        this.props.onLogout();

    }
    render () {
        return <Redirect to="/"/>;
    }
}

const mapDisptachToProps = dispatch => {
    return {
        onLogout : () => dispatch(authAction.logout())
    };
};

export default connect(null,mapDisptachToProps)(Logout);