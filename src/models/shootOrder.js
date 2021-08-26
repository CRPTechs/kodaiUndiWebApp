import moment from 'moment';

class shootOrder {
    constructor(id,shootTypeId,shootType,price,picCount,name,phone,status,createdDate,userId) {
        this.id = id;
        this.shootTypeId = shootTypeId;
        this.shootType = shootType;
        this.price = price;
        this.picCount = picCount;
        this.status = status;
        this.name = name;
        this.phone = phone;
        this.createdDate = createdDate;
        this.userId = userId;
    }   
    get readableDate() {
        return moment(this.date).format('Do MMMM YYYY, hh:mm');
    }
}

export default shootOrder;