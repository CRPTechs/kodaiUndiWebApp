import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';
import { connect } from 'react-redux';
import * as orderAction from '../../store/orderAction';
import './Data.css';

class Data extends Component {
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
                    date:{
                        elementType: 'input',
                        elementConfig: {
                            type: 'date',
                            placeholder: 'Date and Time'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    hours: {
                        elementType:'select',
                        elementConfig: {
                            options: [
                                {value: '1',displayValue: '1'},
                                {value: '2',displayValue: '2'},
                                {value: '3',displayValue: '3'},
                                {value: '4',displayValue: '4'},
                                {value: '5',displayValue: '5'},
                                {value: '6',displayValue: '6'},
                                {value: '7',displayValue: '7'},
                                {value: '8',displayValue: '8'},
                                {value: '9',displayValue: '9'},
                                {value: '10',displayValue: '10'},
                                {value: '11',displayValue: '11'},
                                {value: '12',displayValue: '12'},
                            ]
                        },
                        value: '12',
                        validation: {},
                        valid: true
                    },
                    mins: {
                        elementType:'select',
                        elementConfig: {
                            options: [
                                {value: '00',displayValue: '00'},
                            ]
                        },
                        value: '00',
                        validation: {},
                        valid: true
                    },
                    meridian: {
                        elementType:'select',
                        elementConfig: {
                            options: [
                                {value: 'AM',displayValue: 'AM'},
                                {value: 'PM',displayValue: 'PM'},
                            ]
                        },
                        value: 'AM',
                        validation: {},
                        valid: true
                    },
                    // address: {
                    //     elementType:'input',
                    //     elementConfig: {
                    //         type:'text',
                    //         placeholder:'Full Address'
                    //     },
                    //     value: '',
                    //     validation: {},
                    //     valid: true
                    // },
                    // circle: {
                    //     elementType:'select',
                    //     elementConfig: {
                    //         options: [
                    //             {value: 'Anna Nagar',displayValue: 'Anna Nagar'},
                    //             {value: 'Theppakulam',displayValue: 'Theppakulam'},
                    //             {value: 'Keelavasal',displayValue: 'Keelavasal'},
                    //             {value: 'Simmakal',displayValue: 'Simmakal'},
                    //             {value: 'Koripalayam',displayValue: 'Koripalayam'},
                    //             {value: 'Sellur',displayValue: 'Sellur'},
                    //             {value: 'Pudhur',displayValue: 'Pudhur'},
                    //             {value: 'Periyar',displayValue: 'Periyar'},
                    //             {value: 'Karuppayurani',displayValue: 'Karuppayurani'},

                    //         ]
                    //     },
                    //     value: 'Anna Nagar',
                    //     validation: {},
                    //     valid: true
                    // }
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
        console.log('testing');
        event.preventDefault();
            const formData = {};
            for (let formElementIdentifier in this.state.orderForm) {
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            }
            const order = {
             formData
    }
    this.props.onAddDetails(order);
    alert('Details Saved');
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
            <button className="Button" disabled={!this.state.formIsValid}>Save the Details</button> 
        </form>);
        const handleHistory = () => {
            this.history.go("/services");  
        }
        return(
            <div>
            <strong>Note: Please place the order before 1 hour.</strong>
            {form}
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddDetails: (orderData) => dispatch(orderAction.addDetails(orderData))
    };
};

export default connect(null,mapDispatchToProps)(Data);