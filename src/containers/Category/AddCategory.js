import React, { useState } from 'react';
import db from '../../firebaseService';
import './AddCategory.css';

const AddCategory = () => {
    const initialFieldValues = {
        category: ''
    }

    var [values, setValues] = useState(initialFieldValues)

    const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

    const add = obj => {
        db.child('categories').push(
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
        <form autoComplete="off" onSubmit={handleFormSubmit} className='categoryForm'>
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
            <div className="form-group">
                <input type="submit" value="Save" className="btn btn-primary btn-block" />
            </div>
        </form>
    )
}

export default AddCategory;