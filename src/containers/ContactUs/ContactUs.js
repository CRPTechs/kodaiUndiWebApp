import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneSquareAlt, FaMailBulk } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as orderAction from '../../store/orderAction';
import { Modal } from 'react-bootstrap';
import './ContactUs.css';
import Terms from './Terms';
import Privacy from './Privacy';

const Contact = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const initialValues = { name: '', phone: '', email: '', message: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const detailsHandler = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch(orderAction.contactUsAction(formValues.name, formValues.phone, formValues.email, formValues.message));
            alert('You raised the suggestion. Our team will contact you ASAP!');
            history.push('/');
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
        return errors;
    }
    const buttonHandler = () => {
        setPrivacy(true);
    }
    const [isSelected, setIsSelected] = useState('privacy');
    const selectHandler = (option) => {
        setIsSelected(option);
    }
    return (
        <>
        <Modal show={privacy} onHide={() => { setPrivacy(false) }}>
                <div>
                    <div className='contactModal'>
                        <div className={isSelected === 'privacy' ? 'optionSelected' : 'contactModalDiv'} onClick={() => selectHandler('privacy')}>Privacy Policy</div>
                        <div className={isSelected === 'terms' ? 'optionSelected' : 'contactModalDiv'} onClick={() => selectHandler('terms')}>Terms and Conditions</div>
                    </div>
                    { isSelected === 'terms' && <Terms /> }
                    { isSelected === 'privacy' && <Privacy /> }
                </div>
            </Modal>
        <div className="contactContainer">
            <div className="formContainer">
                <div className='formLeftContainer'>
                    <h2 className="formLeftConHeader">Have a Question?</h2>
                    <p className='formLeftConTag'>Left your e-mail and we will contact you soon.</p>
                </div>
                <div className='formRightContainer'>
                    <form onSubmit={detailsHandler}>
                        <input name='name' placeholder='Name' type='text' value={formValues.name} className='nameInput' onChange={(e) => handleChange(e)} />
                        <p className='errorMessage'>{formErrors.name}</p>
                        <input name='phone' placeholder='Phone' type='text' value={formValues.phone} className='phoneInput' onChange={handleChange} />
                        <p className='errorMessage'>{formErrors.phone}</p>
                        <input name='email' placeholder='Email' type='email' value={formValues.email} className='emailInput' onChange={handleChange} />
                        <p className='errorMessage'>{formErrors.email}</p>
                        <input name='message' placeholder='Message' type='text' value={formValues.message} className='emailInput' onChange={handleChange} />
                        <button className='dataButton'>Contact us</button>
                    </form>
                </div>
            </div>
            <div className="addressContainer">
                <div className='addressLeftContainer'>
                    <h4 className="addressContainerHeader">Address</h4>
                    <div className='addressContainerDiv'>
                        <ul className="list-unstyled">
                            <li>Kodai Undi</li>
                            <li>Near Manor Bungalow, Lake Road,</li>
                            <li>Kodaikanal-624101.</li>
                            <li>Tamilnadu, India.</li>
                        </ul>
                            <ul className="list-unstyled socialMediaUl">
                                <li className="nav-item active socialMediaLi">
                                    <a className="" href="https://www.facebook.com/crp.undi.5">
                                        <FaFacebookF />
                                    </a>
                                </li>
                                <li className="nav-item active socialMediaLi">
                                    <a className="" href="https://www.instagram.com/kodaiundi/?hl=en">
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li className="nav-item active socialMediaLi">
                                    <a className="" href="/">
                                        <FaTwitter />
                                    </a>
                                </li>
                            </ul>
                    </div>
                </div>
                <div className="addressRightContainer">
                    <h4 className="addressContainerHeader">Contacts</h4>
                    <ul className='list-unstyled'>
                        <li><FaPhoneSquareAlt /> +91 9442777047</li> 
                        <li><FaMailBulk /> support@kodaiundi.in</li>
                    </ul>
                    <button className='dataButton' onClick={buttonHandler}>Privacy Policy</button>
                </div>
                <div className='mapContainer'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.318975187508!2d77.48424611397165!3d10.235837371739535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07676e9f9b6965%3A0xd256e2089dc84398!2sKodai%20Undi!5e0!3m2!1sen!2sin!4v1649669922470!5m2!1sen!2sin" width="400" height="200" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
        </>
    )
};

export default Contact;
