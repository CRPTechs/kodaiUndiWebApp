import moment, { min } from 'moment';

class roomOrder {
    constructor(id,hotelId,personName,personPhone,checkInDate,checkInTime,checkOutDate,checkOutTime,children,roomsCount,status,totalPrice) {
        this.id = id;
        this.hotelId = hotelId;
        this.personName = personName;
        this.personPhone = personPhone;
        this.checkInDate = checkInDate;
        this.checkInTime = checkInTime;
        this.checkOutDate = checkOutDate;
        this.checkOutTime = checkOutTime;
        this.children = children;
        this.roomsCount = roomsCount;
        this.status = status;
        this.totalPrice = totalPrice;
    }
    get readableDate() {
        return moment(this.date).format('Do MMMM YYYY, hh:mm');
    }
}

export default roomOrder;