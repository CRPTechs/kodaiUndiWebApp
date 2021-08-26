class Items {
    imageData;
    constructor(id, userId, title, imageUrl, description, price, meal, category) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.meal = meal;
        this.category = category;
    }
}

export default Items;