class Items {
    imageData;
    constructor(id, title, imageUrl, description, price, meal, category, status) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.meal = meal;
        this.category = category;
        this.status = status;
    }
}

export default Items;