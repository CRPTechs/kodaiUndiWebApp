import React, {useState} from 'react';
import db from '../../firebaseService';

const AddPhotography = () => {
    const initialFieldValues = {
        name: '',
        description: '',
        price: '',
        picCount: ''
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
        db.child('photography').push(
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
        alert("Photography type added successfully.");
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
                <input className="form-control" placeholder="Type of Photography" name="name"
                    value={values.name}
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
                <input className="form-control" placeholder="Picture Count" name="picCount"
                    value={values.picCount}
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

export default AddPhotography;