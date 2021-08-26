import React, { useState } from 'react';
import db from '../../firebaseService';
import './AddRooms.css';

const AddRooms = (props) => {
    const initialFieldValues = {
        name: '',
        address: '',
        about: '',
        amenities: '',
        nearby: '',
        foods: '',
        cabGuide: '',
        price: '',
        persons: '',
        roomType: ''
    }

    var [values, setValues] = useState(initialFieldValues)

    const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const add = obj => {
        db.child('accomodation').push(
            obj,
            err => {
                if (err) {
                    console.log(err);
                }
            }
        )
    }

    const handleFormSubmit = e => {
        console.log(JSON.stringify(values));
        e.preventDefault();
        add(values);
        // window.location.reload();
        alert("Accomodation added successfully.");
    }

    return (
        <div style={{ margin: '100px' }}>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Hotel Name" name="name"
                        value={values.name}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Address" name="address"
                        value={values.address}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="About hotel" name="about"
                        value={values.about}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Amenities" name="amenities"
                        value={values.amenities}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="What's nearby" name="nearby"
                        value={values.nearby}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Food availability" name="foods"
                        value={values.foods}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Cab and Guide Availability" name="cabGuide"
                        value={values.cabGuide}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Price" name="price"
                        value={values.price}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="How many persons can occupy" name="persons"
                        value={values.persons}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-arrow-circle-right"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Room Type" name="roomType"
                        value={values.roomType}
                        onChange={handleInputChange} />
                </div>
                <br />
                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                </div>
            </form>
        </div>
    )
}

export default AddRooms;