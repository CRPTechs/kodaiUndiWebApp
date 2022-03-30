class Order {
    constructor(id, items, totalAmount, createdDate, orderDate, status, name, phone, email, time) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.createdDate = createdDate;
        this.orderDate = orderDate;
        this.status = status;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.time = time;
    }
}
export default Order;