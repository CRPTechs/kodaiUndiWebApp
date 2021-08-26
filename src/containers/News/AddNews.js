import React, { useState } from 'react';
import db from '../../firebaseService';
import './AddNews.css';

const AddNews = () => {
    const initialFieldValues = {
        category: '',
        headlines: '',
        details: ''
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
        db.child('news').push(
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
        window.location.reload();
        alert("News submitted successfully.");
    }

    return (
        <div className="AddNews">
        <form autoComplete="off" onSubmit={handleFormSubmit}>
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
                <input className="form-control" placeholder="Headlines" name="headlines"
                    value={values.headlines}
                    onChange={handleInputChange} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-arrow-circle-right"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Detailed News" name="details"
                    value={values.details}
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

export default AddNews;