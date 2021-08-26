import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import './Auth.css';
import * as authAction from '../../store/authAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import logo from '../../images/Undi.jpeg';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }   

        checkValidity(value, rules) {
            let isValid = true;
            if (!rules) {
                return true;
            }

            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }

            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid
            }

            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid
            }

            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            }

            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            }

            return isValid;
        }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        const style = {
            width: 500,
            height: 400,
            marginTop: 5
        }

        return (
            <div className="root">
            <div className="AuthHead">
                <img src={logo} style={style}/>
            </div>
            <div className="Auth">
                <p>Are you a New Guest? Register Here.</p>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <button className="Button">Submit</button>
                </form>
                <a href="/help">Forget Password?</a>
                <p>Already a Guest! Press Sign In.</p>
                <button
                    onClick={this.switchAuthModeHandler}
                    className="Button">Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}</button>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.cart.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDisptachToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(authAction.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(authAction.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDisptachToProps)(Auth);