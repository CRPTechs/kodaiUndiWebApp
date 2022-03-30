import React, { useState, useEffect } from 'react';
import db from '../../firebaseService';
import './AddMenu.css';

const AddMenu = () => {
    const initialFieldValues = {
        category: '',
        title: '',
        description: '',
        imageUrl: '',
        meal: '',
        price: 0,
        imageData: ''
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

    const fileSelectedHandler = event => {
        if (event.target.files[0]) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                setValues({
                    ...values,
                    imageData: reader.result
                })
            }
            reader.readAsDataURL(file);
        }
    }

    const add = obj => {
        db.child('products').push(
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
        alert("Menu added successfully.");
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit} className="Form">
            {/* <h4>Add Menu</h4> */}
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-arrow-circle-right"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Category" name="category"
                    value={values.category}
                    onChange={handleInputChange} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-arrow-circle-right"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Food Name" name="title"
                    value={values.title}
                    onChange={handleInputChange} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-arrow-circle-right"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Description" name="description"
                    value={values.description}
                    onChange={handleInputChange} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-arrow-circle-right"></i>
                    </div>
                </div>
                <input type="file" className="form-control" placeholder="Image Url" name="imageUrl"
                    onChange={fileSelectedHandler} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-arrow-circle-right"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Meal" name="meal"
                    value={values.meal}
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
            <br />
            <div className="form-group">
                <input type="submit" value="Save" className="btn btn-primary btn-block" />
            </div>
        </form>
    )
}

export default AddMenu;