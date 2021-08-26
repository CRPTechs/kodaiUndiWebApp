class Products {
    imageData;
    constructor(id, userId,title,description,price,weight){
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.weight = weight;
    }
}

export default Products;