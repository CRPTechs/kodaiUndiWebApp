import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../../components/Cart/Cart';
import * as orderAction from '../../store/orderAction';
import * as cartAction from '../../store/cartAction';
import './Carts.css';
import { useHistory } from 'react-router-dom';
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

const Carts = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const orderDetails = useSelector(state => state.order.current_details);
  console.log(JSON.stringify(orderDetails));
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
  const addOrderHandler = () => {
    dispatch(orderAction.addOrder(cartItems, cartTotalAmount, orderDetails));
    alert('Your order has been placed successfully. Now proceed to pay for the order.');
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
    <div> 
      <div className="Cart">
        <h3>Your Cart</h3>
        <p><strong>Name:</strong> {orderDetails.orderData.formData.name }</p>
        <p><strong>Phone:</strong> {orderDetails.orderData.formData.phone}</p>
        { orderDetails.orderData.formData.date 
        ? <p><strong>Date:</strong> {orderDetails.orderData.formData.date} <strong>Time:</strong> {orderDetails.orderData.formData.hours}:{orderDetails.orderData.formData.mins}
        {orderDetails.orderData.formData.meridian}</p>
        : null 
        }
        { orderDetails.orderData.formData.address
        ? <p><strong>Address:</strong> {orderDetails.orderData.formData.address}, 
        {orderDetails.orderData.formData.zipcode}, {orderDetails.orderData.formData.country}</p>
        : null
        }
        <p>Total Amount: <strong>Rs: {cartTotalAmount}</strong></p>
        <button className="Button" onClick={addOrderHandler}>Order Now</button>
      </div>
      {cartItems.map(cart => (
        <Cart
          key={cart.productId}
          productTitle={cart.productTitle}
          productPrice={cart.productPrice}
          amount={cart.sum}
          quantity={cart.quantity}
          prodWeight={cart.prodWeight}>
          <button onClick={() => { dispatch(cartAction.removeFromCart(cart.productId)) }}>Delete</button>
        </Cart>
      ))}
      <br />
      <button className="Button" onClick={displayRazorpay}>Proceed to Pay</button>
    </div>
  )
};

export default Carts;