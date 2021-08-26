import React, { useState, useEffect } from 'react';
import db from '../../firebaseService';

const Feedback = () => {
    var [feedbackList, setFeedbackList] = useState({});

    useEffect(() => {
        db.child('feedback').on('value', snapshot => {
            if (snapshot.val() != null)
                setFeedbackList({
                    ...snapshot.val()
                })
            console.log(setFeedbackList);
        })
    }, [])
    return (
        <div>
            <table className="table table-border table-stripped">
                <thead className="thead-light">
                    <tr>
                        <th></th>
                        <th>Overall Experience</th>
                        <th>Food Quality</th>
                        <th>Recommend</th>
                        <th>Order Again</th>
                        <th>Overall Service</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(feedbackList).map(id => {
                            return <tr key={id}>
                                <td>{feedbackList[id].exper}</td>
                                <td>{feedbackList[id].food}</td>
                                <td>{feedbackList[id].friends}</td>
                                <td>{feedbackList[id].order}</td>
                                <td>{feedbackList[id].service}</td>
                                <td>{feedbackList[id].userId}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Feedback;