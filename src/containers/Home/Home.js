import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import './Home.css';
import image1 from '../../images/karuveppilai_english.jpg';
import image2 from '../../images/malai_gingee_english.jpg';
import image3 from '../../images/malai_nelli_english.jpg';
import image4 from '../../images/poondu_english.jpg';
import image5 from '../../images/gourmet_tamizhan.jpg';
import image6 from '../../images/manjal_tamil.jpg';
import image7 from '../../images/milagu_english.jpg';
import Contact from '../ContactUs/ContactUs';
import { Modal, Button } from 'react-bootstrap';
import Header from '../Header/Header';

const Home = () => {
    const [show, setShow] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    setTimeout(() => {
        setShow(prevState => !prevState);
    }, 6000);
    return (
        <>
            <Header />
            <div className="homeContent">
                <div className='firstContainer'>
                    <div className='firstConImageContainer'>
                        <img src={image1} className="firstConImage" />
                    </div>
                    <span className="firstConSpan">An idea built on a primary objective of reviving our Tamizh ethinic food culture, And this Ethinic food culture is from our Oldest Land "Kurinji Theenai" to our people.
                        We, <b>Kodai Undi</b> a division of <b>CRP Culinary Private Limited</b> mainly focusing on our Food Culture. As a team we hardly working to get the Traditional Tamil Food Culture back to our people.
                        Our services are Food Ordering, Location based Accomodation, Trekking, Local Guides support, Local News from us to you, Local Transport support and facility in the Western Ghats specifically on Kodaikanal.</span>
                </div>
                <div className='secondContainer'>
                    <span className="secondConSpan">An idea built on a primary objective of reviving our Tamizh ethinic food culture, And this Ethinic food culture is from our Oldest Land "Kurinji Theenai" to our people.
                        We, <b>Kodai Undi</b> a division of <b>CRP Culinary Private Limited</b> mainly focusing on our Food Culture. As a team we hardly working to get the Traditional Tamil Food Culture back to our people.
                        Our services are Food Ordering, Location based Accomodation, Trekking, Local Guides support, Local News from us to you, Local Transport support and facility in the Western Ghats specifically on Kodaikanal.</span>
                    <div className='secondConImageContainer'>
                        <img src={image1} className="secondConImage" />
                    </div>
                </div>
            </div>
            <div className="homeContentResponsive">
                <div className='firstContainer'>
                    <div className='firstConImageContainer'>
                        <img src={image1} className="firstConImage" />
                    </div>
                    <span className="firstConSpan">An idea built on a primary objective of reviving our Tamizh ethinic food culture, And this Ethinic food culture is from our Oldest Land "Kurinji Theenai" to our people.
                        We, <b>Kodai Undi</b> a division of <b>CRP Culinary Private Limited</b> mainly focusing on our Food Culture. As a team we hardly working to get the Traditional Tamil Food Culture back to our people.
                        Our services are Food Ordering, Location based Accomodation, Trekking, Local Guides support, Local News from us to you, Local Transport support and facility in the Western Ghats specifically on Kodaikanal.</span>
                </div>
                <div className='secondContainer'>
                <div className='secondConImageContainer'>
                        <img src={image1} className="secondConImage" />
                    </div>
                    <span className="secondConSpan">An idea built on a primary objective of reviving our Tamizh ethinic food culture, And this Ethinic food culture is from our Oldest Land "Kurinji Theenai" to our people.
                        We, <b>Kodai Undi</b> a division of <b>CRP Culinary Private Limited</b> mainly focusing on our Food Culture. As a team we hardly working to get the Traditional Tamil Food Culture back to our people.
                        Our services are Food Ordering, Location based Accomodation, Trekking, Local Guides support, Local News from us to you, Local Transport support and facility in the Western Ghats specifically on Kodaikanal.</span>
                </div>
            </div>
            <Contact />
            <Footer />
        </>
    )
};

export default Home;