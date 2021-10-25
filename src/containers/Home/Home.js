import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../../images/icon.png';
import Footer from '../Footer/Footer';
import './Home.css';
import image1 from '../../images/karuveppilai_english.jpg';
import image2 from '../../images/malai_gingee_english.jpg';
import image3 from '../../images/malai_nelli_english.jpg';
import image4 from '../../images/poondu_english.jpg';
import image5 from '../../images/gourmet_tamizhan.jpg';
import image6 from '../../images/manjal_tamil.jpg';
import image7 from '../../images/milagu_english.jpg';
import MenuCard from '../Foods/MenuCard';
import Contact from '../ContactUs/ContactUs';

const Home = () => {
    const [show, setShow] = useState(false);
    setTimeout(() => {
        setShow(prevState => !prevState);
    }, 5000);
    return (
        <>
            <div className="homeContainer">
                <div className="homeHeaderLeft">
                    <FaFacebookF className="fbLogo" />
                    <FaTwitter className="twitterLogo" />
                    <FaInstagram className="instaLogo" />
                    <span className="contactSpan">+91 9442777046</span>
                    <span className="mailSpan">contact@kodaiundi.com</span>
                </div>
                <div className="homeHeaderRight">
                    <img src={logo} className="undiLogo" />
                    <span className="undiName"><strong>Kodai Undi</strong></span>
                </div>
            </div>
            <div className="homeContent">
                {/* <h2 className="homeContentHeader">Kodai Undi</h2> */}
                <span className="homeContentSpan">An idea built on a primary objective of reviving our Tamizh ethinic food culture, And this Ethinic food culture is from our Oldest Land "Kurinji Theenai" to our people.
                    We, <b>Kodai Undi</b> a division of <b>CRP Culinary Private Limited</b> mainly focusing on our Food Culture. As a team we hardly working to get the Traditional Tamil Food Culture back to our people.
                    Our services are Food Ordering, Location based Accomodation, Trekking, Local Guides support, Local News from us to you, Local Transport support and facility in the Western Ghats specifically on Kodaikanal.</span>
            </div>
            <div className="homeContentServices">
                {show ? <img src={image1} className="imageGallery" /> : <img src={image4} className="imageGallery" />}
                {show ? <img src={image2} className="imageGallery" /> : <img src={image5} className="imageGallery" />}
                {show ? <img src={image3} className="imageGallery" /> : <img src={image7} className="imageGallery" />}
            </div>
            <MenuCard />
            <Contact />
            {/* <Footer /> */}
        </>
    )
};

export default Home;