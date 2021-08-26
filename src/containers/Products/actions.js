import Products from "../../models/products";

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = async () => {
    try {
        const response = await fetch(
            'https://crpapp-default-rtdb.firebaseio.com/items.json'
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        const loadedProducts = [];

        for (const key in resData) {
            let products = new Products(
                key,
                resData[key].ownerId,
                resData[key].title,
                resData[key].description,
                resData[key].price,
                resData[key].weight
            );
            products.imageData = resData[key].imageData
            loadedProducts.push(
                products
            );
        }
        return {
            type: SET_PRODUCTS,
            products: loadedProducts
        }
    }
    catch (err) {
        throw err;
    }
}