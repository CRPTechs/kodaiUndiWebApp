import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';
import { connect } from 'react-redux';
import * as orderAction from '../../store/orderAction';
import './ProductData.css';

class ProductData extends Component {
    state = {
        orderForm: {
                    name:{
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Your Name'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    phone: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Phone'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    address: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Address'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    zipcode:{
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Zip Code'
                        },
                        value: '',
                        validation: {
                            required: true,
                            minLength: 5,
                            maxLength: 5
                        },
                        valid: false,
                        touched: false
                    },
                    country: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Country'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    }
        },
        formIsValid: false,
        show:true
    }
    cancelHandler = () => {
        this.setState({show: false});
    }

    checkValidity(value, rules) {
        let isValid = true;
        if(!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] 
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    orderHandler = (event) => {
        event.preventDefault();
            const formData = {};
            for (let formElementIdentifier in this.state.orderForm) {
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            }
            const order = {
             formData
    }
    this.props.onAddDetails(order);
    this.props.history.push('/products');
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event,formElement.id)}> 
                        </Input>
            ))}
                <button className="Button"
                disabled={!this.state.formIsValid}>Save the details</button>  
        </form>);

        return(
            <div>
            {form}
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddDetails: (orderData) => dispatch(orderAction.addAddress(orderData))
    };
};

export default connect(null,mapDispatchToProps)(ProductData);