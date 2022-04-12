import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../../components/Cart/Cart';
import * as orderAction from '../../store/orderAction';
import * as cartAction from '../../store/cartAction';
import './Carts.css';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import emailjs from 'emailjs-com';
import ReactWhatsapp from 'react-whatsapp';
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

const Carts = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const razorpay_order_details = useSelector(state => state.order.razorpay_order_details);
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        prodWeight: state.cart.items[key].prodWeight
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const details = sessionStorage.getItem('orderDetails');
  const orderDetails = JSON.parse(details);
  const addOrderHandler = () => {
    dispatch(orderAction.addOrder(cartItems, cartTotalAmount, orderDetails.name, orderDetails.phone, orderDetails.email, orderDetails.date, orderDetails.time, orderDetails.dobDate, orderDetails.domDate));
    dispatch(orderAction.sendMailAction(orderDetails.email));
    alert('Your order has been placed successfully. Now proceed to pay for the order.');
  }
  const sendMail = () => {
    const email = sessionStorage.email;
    emailjs.sendForm('service_vutkn0c', 'template_az1hv7b', email, 'user_ZZAsm3LtUJqPK2GXMv8iv')
    .then(res => {
      console.log(res);
    }).catch(err => console.log(err));
  }
  const loadScript = () => {
    return new Promise(resolve => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      // document.body.appendChild(script)
    });
  };
  const displayRazorpay = () => {
    const res = loadScript()
    if (!res) {
      alert('Razorpay failed to load! Check your internet coonection?');
      return;
    }
    const options = {
      "key": "rzp_live_jQ5jvvQyL9efRf",
      "amount": razorpay_order_details.amount,
      "currency": "INR",
      "name": "Kodai Undi",
      "description": "CRP Culinary",
      "order_id": razorpay_order_details.id,
      "handler": function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        dispatch(orderAction.update_order(razorpay_order_details.receipt_id,
          { status: 'Payment Success', ...response },
          orderAction.PAYMENT_SUCCESS));
        alert('Your payment is successful and your order has been placed. Thanks for ordering!');
        history.push('/');
      },
      "prefill": {
        "name": "Kodai Undi",
        "email": "tech@crpculinary.in",
        "contact": "7639305434"
      },
      "notes": {
        "address": "CRP Culinary Private Limited Madurai"
      },
      "theme": {
        "color": "#B30019"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      dispatch(orderAction.update_order(razorpay_order_details.receipt_id,
        { status: 'Payment Failed', ...response },
        orderAction.PAYMENT_FAILED));
      alert(response.error.description, response.error.reason);
      history.push('/');
    });
    rzp1.open();
  }
  return (
    <>
      <Header />
      {cartItems.length > 0 ?
        <div>
          <div className='cartDetails'>
            <h4 className='cartHeader'>Order Details:</h4>
            <div className='contactDetails'>
              <p className='contactName'><strong>Name:</strong> {orderDetails.name === 'undefined' ? '' : orderDetails.name}</p>
              <p className='contactPhone'><strong>Phone:</strong> {orderDetails.phone === 'undefined' ? '' : orderDetails.phone}</p>
              <p className='contactEmail'><strong>Email:</strong> {orderDetails.email === 'undefined' ? '' : orderDetails.email}</p>
              <p className='contactDate'><strong>Date and Time:</strong> {orderDetails.date === 'undefined' ? '' : orderDetails.date + ' / ' + orderDetails.time + orderDetails.meridian}</p>
            </div>
          </div>
          {cartItems.map(cart => (
            <Cart
              key={cart.productId}
              productTitle={cart.productTitle}
              productPrice={cart.productPrice}
              amount={cart.sum}
              quantity={cart.quantity}
              prodWeight={cart.prodWeight}>
              <button onClick={() => { dispatch(cartAction.removeFromCart(cart.productId)) }} className='deleteButton'>Delete</button>
            </Cart>
          ))}
          <p className='totalAmount'>Total Amount: <strong>Rs: {cartTotalAmount}</strong></p>
          <p className='totalAmountNote'>(inclusive of all taxes)</p>
          {/* <hr /> */}
          <button className="cartButton" onClick={addOrderHandler}>Order Now</button>
          <button className="cartButton" onClick={displayRazorpay}>Proceed to Pay</button>
        </div>
        : <div className='emptyCart'>Your cart is empty. Order Something!</div>
      }
    </>
  )
};

export default Carts;