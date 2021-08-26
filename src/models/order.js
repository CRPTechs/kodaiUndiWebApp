import moment, { min } from 'moment';

class Order {
    id;
    items;
    data;
    totalAmount;
    createdDate;
    status;
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }
    get readableDate() {
        return moment(this.date).format('Do MMMM YYYY, hh:mm');
    }
}

export default Order;