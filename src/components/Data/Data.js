import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as orderAction from '../../store/orderAction';
import './Data.css';

const Data = () => {
    const initialValues = { name: '', phone: '', email: '', date: '', time: '', meridian: 'AM', dobDate: '', domDate: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const history = useHistory();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const detailsHandler = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            sessionStorage.setItem('orderDetails', JSON.stringify(formValues));
            history.push('/cart');
        }
    }
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors])
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            errors.name = 'Please enter Name!';
        }
        if (!values.phone) {
            errors.phone = 'Please enter Phone Number!';
        }
        if (!values.email) {
            errors.email = 'Please enter Email ID!';
        } else if (!regex.test(values.email)) {
            errors.email = 'Please enter valid Email ID!';
        }
        if (!values.date) {
            errors.date = 'Please select Date!';
        }
        if (!values.time) {
            errors.time = 'Please select Time!';
        }
        return errors;
    }
    return (
        <div>
            <strong>Note: Please place the order before 3 hours.</strong>
            <form onSubmit={detailsHandler}>
                <input name='name' placeholder='Name' type='text' value={formValues.name} className='nameInput' onChange={(e) => handleChange(e)} />
                <p className='errorMessage'>{formErrors.name}</p>
                <input name='phone' placeholder='Phone' type='text' value={formValues.phone} className='phoneInput' onChange={handleChange} />
                <p className='errorMessage'>{formErrors.phone}</p>
                <input name='email' placeholder='Email' type='email' value={formValues.email} className='emailInput' onChange={handleChange} />
                <p className='errorMessage'>{formErrors.email}</p>
                <div className='orderDateDiv'>
                    <label>Date of Order: </label>
                    <input name='date' placeholder='Date' type='date' value={formValues.date} className='dateInput' onChange={handleChange} />
                    <p className='errorMessage'>{formErrors.date}</p>
                </div>
                <div className='orderTimeDiv'>
                    <label>Order Time: </label>
                    <select name='time' className='timeInput' onChange={handleChange} value={formValues.time}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                    </select>
                    <select name='meridian' value={formValues.meridian} className='meridianInput' onChange={handleChange}>
                        <option value='AM'>AM</option>
                        <option value='PM'>PM</option>
                    </select>
                    <p className='errorMessage'>{formErrors.time}</p>
                </div>
                <span className='bannerNote'>We take care for the celebration of your special occasions.</span>
                <div className='dobInputDiv'>
                    <label>Date of Birth: </label>
                    <input name='dobDate' placeholder='Date' type='date' value={formValues.dobDate} className='dobInput' onChange={handleChange} />
                </div>
                <div className='domInputDiv'>
                    <label>Date of Marriage: </label>
                    <input name='domDate' placeholder='Date' type='date' value={formValues.domDate} className='domInput' onChange={handleChange} />
                </div>
                <button className='dataButton'>Save and move to cart</button>
            </form>
        </div>
    )
}

export default Data;