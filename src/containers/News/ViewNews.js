import React, { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import db from '../../firebaseService';
import './ViewNews.css';

const ViewNews = () => {
    var [news, setNews] = useState({});

    useEffect(() => {
        db.child('news').on('value', snapshot => {
            if (snapshot.val() != null)
                setNews({
                    ...snapshot.val()
                })
            console.log(setNews);
        })
    }, [])

    return (
        <div className="News">
            <div className="container">
                <h4>Know the Latest Updates of Kodaikanal</h4>
                {
                    Object.keys(news).map(id => {
                        return <tr key={id}>
                            <div className="table table-border table-stripped">
                                <td>{news[id].headlines}:</td> <br />
                                <td className="table-content">{news[id].details}</td>
                            </div>
                        </tr>
                    })
                }
            </div>
            <Footer />
        </div>
    )
}

export default ViewNews;