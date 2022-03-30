import React, { Component } from 'react';
import './App.css';
import Orders from './containers/ViewOrders/ViewOrders';
import Nav from './containers/Navigation/Nav';
import AddMenu from './containers/Foods/AddMenu';
import Feedback from './containers/Feedback/AddFeedback';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import AddNews from './containers/News/AddNews';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from './images/kodai_snap_land.jpg';
import img2 from './images/kodai_snap_upper.jpg';
import img3 from './images/kodai_snap_farmer.jpg';
import img4 from './images/kodai_snap_farming.jpg';
import img5 from './images/kodai_snap_kurinji.jpg';
import img6 from './images/kodai_snap_sun.jpg';
import img7 from './images/kodai_snap_agri.jpg';
import AddCategory from './containers/Category/AddCategory';
import Footer from './containers/Footer/Footer';
import Contact from './containers/ContactUs/ContactUs';
import About from './containers/AboutUs/AboutUs';
import ViewNews from './containers/News/ViewNews';
import AddProducts from './containers/Products/AddProducts';
import MenuCard from './containers/Foods/MenuCard';
import Carts from './containers/Carts/Carts';
import Data from './components/Data/Data';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as authAction from './store/authAction';
import UserOrders from './containers/ViewOrders/UserOrders';
import EditMenu from './containers/Foods/EditMenu';
import SelectedMenu from './containers/Foods/SelectedMenu';
import Help from './containers/Help/Help';
import changePassword from './containers/Help/ChangePassword';
import ProductData from './components/ProductData/ProductData';
import Products from './containers/Products/Products';
import AddLocation from './containers/Locations/AddLocation';
import AddRooms from './containers/Accomodation/AddRooms';
import RoomOrders from './containers/ViewOrders/ViewRoomOrders';
import AddPhotography from './containers/Photography/AddPhotography';
import Shoot from './containers/Photography/Shoot';
import Accomodation from './containers/Accomodation/Accomodation';
import Home from './containers/Home/Home';
import AllOrders from './containers/Orders/Orders';
import Admin from './containers/Admin/Admin';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignUp();
  }
  render () {
    return (
      <Router>
      <div className="App">
        {/* <Nav /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/adminPanel" component={Admin} />
          <Route path="/ordersList" component={Orders} />
          <Route path="/addProducts" component={AddProducts} />
          <Route path="/addMenu" component={AddMenu} />
          <Route path="/addCategory" component={AddCategory} />
          <Route path="/addNews" component={AddNews} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/orders" component={AllOrders} />
          <Route path="/details" component={Data} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/news" component={ViewNews} />
          <Route path="/cart" component={Carts} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/userOrders" component={UserOrders} />
          <Route path="/editMenu" component={EditMenu} />
          <Route path="/selectedMenu" component={SelectedMenu} />
          <Route path="/help" component={Help} />
          <Route path="/changePassword" component={changePassword} />
          <Route path="/productData" component={ProductData} />
          <Route path="/products" component={Products} />
          <Route path="/addLocation" component={AddLocation} />
          <Route path="/addRooms" component={AddRooms} />
          <Route path="/roomOrdersList" component={RoomOrders} />
          <Route path="/addPhotography" component={AddPhotography} />
          <Route path="/shoot" component={Shoot} />
          <Route path="/accomodation" component={Accomodation}/>
        </Switch>
      </div>
    </Router>
    )
  }
};

// const Home = () => (
//   <>
//     <div>
//       <div>
//         <Carousel autoPlay={true} transitionTime={1000} infiniteLoop={true}>
//           <div>
//             <img src={img1} />
//           </div>
//           <div>
//             <img src={img2} />
//           </div>
//           <div>
//             <img src={img3} />
//           </div>
//           <div>
//             <img src={img4} />
//           </div>
//           <div>
//             <img src={img5} />
//           </div>
//           <div>
//             <img src={img6} />
//           </div>
//           <div>
//             <img src={img7} />
//           </div>
//         </Carousel>
//       </div>
//       <h3>Welcome to Kodai Undi</h3>
//       <p>An idea built on a primary objective of reviving our Tamizh ethinic food culture, And this Ethinic food culture is from our Oldest Land "Kurinji Theenai" to our people.
//     We, <b>Kodai Undi</b> a division of <b>CRP Culinary Private Limited</b> mainly focusing on our Food Culture. As a team we hardly working to get the Traditional Tamil Food Culture back to our people.
//     Our services are Food Ordering, Location based Accomodation, Trekking, Local Guides support, Local News from us to you, Local Transport support and facility in the Western Ghats specifically on Kodaikanal.</p>
//     </div>
//     <Footer />
//   </>
// );

const mapDisptachToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(authAction.authCheckState())
  };
};


export default withRouter(connect(null,mapDisptachToProps)(App));
