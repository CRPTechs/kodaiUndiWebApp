import React from 'react';
import './Terms.css';

const Terms = () => {
    return (
        <div className='termsContainer'>
            <p>* Please book the Order before 2 Hours</p>
            <p>* Pre-Booking for the Food maximum before 15 days from the Current Date.</p>
            <p>* In case, modification of Order means, it has to be done before 2 days from the booking date.</p>
            <p>* Based on the above mentioned policy, the Order gets Cancelled means the refund amount will be added to your account in 3 working days.</p>
            <p>* Refund amount based on the Cancellation Date, more than 3 days from the Order Date means 100% refund. 
                3 days from the Order Date means 70% refund. 1 day from the Order Date means 30% refund.
                Less than 1 day from the Order Date means no refund.
            </p>
            <p>* The Payment for Orders only through Online Payments like Net Banking, Credit Card or Debit Card or through UPI's. No Cash On Delivery or Cash On Carry options.</p>
            <p>* The pick up time will extend upto two hours from the time of order. After that the food is not given to the concerned person because of delay in pickup until any intimation. The bill amount also not refundable</p>
        </div>
    );
};

export default Terms;