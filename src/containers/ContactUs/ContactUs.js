import React, { useState } from 'react';
import db from '../../firebaseService';
import './ContactUs.css';
import Footer from '../Footer/Footer';

const Contact = () => {
    const initialFieldValues = {
        name: '',
        phone: '',
        email: '',
        subject: '',
        queries: ''
    }

    var [values, setValues] = useState(initialFieldValues);
    const [image, setImage] = useState(null);

    const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const add = obj => {
        db.child('contact').push(
            obj,
            err => {
                if (err) {
                    console.log(err);
                }
            }
        )
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        add(values);
    }

    return (
        <div className="Contact">
            <h3>Contact Us</h3>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fa fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Name" name="name"
                        value={values.category}
                        onChange={handleInputChange} />
                </div>
                <br />
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fa fa-mobile"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Phone" name="phone"
                        value={values.title}
                        onChange={handleInputChange} />
                </div>
                <br />
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fa fa-envelope"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Email" name="email"
                        value={values.description}
                        onChange={handleInputChange} />
                </div>
                <br />
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fa fa-question-circle"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Subject" name="subject"
                        onChange={handleInputChange} />
                </div>
                <br />
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-comments"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Your Queries" name="queries"
                        value={values.meal}
                        onChange={handleInputChange} />
                </div>
                <br />
                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-danger btn-block" />
                </div>
            </form>
            <br />
            <Footer />
        </div>
    )
}

export default Contact;