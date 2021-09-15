import Items from '../../models/items';

export const SET_ITEMS = 'SET_ITEMS';
export const EDIT_ITEMS = 'EDIT_ITEMS';

export const fetchItems = async () => {
    try {
        const response = await fetch(
            'https://crpapp-default-rtdb.firebaseio.com/products.json'
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        console.log(JSON.stringify(resData));
        const loadedItems = [];

        for (const key in resData) {
            let items = new Items(
                key,
                resData[key].ownerId,
                resData[key].title,
                resData[key].imageUrl,
                resData[key].description,
                resData[key].price,
                resData[key].meal,
                resData[key].category
            );
            items.imageData = resData[key].imageData
            loadedItems.push(
                items
            );
        }
        return {
            type: SET_ITEMS,
            items: loadedItems
        }
    }
    catch (err) {
        throw err;
    }
};

export const editItems = (title) => {
    return async () => {
    try {
        const response = await fetch(
            `https://crpapp-default-rtdb.firebaseio.com/products.json?orderBy="title"&equalTo="${title}"`
        );
        if (!response.ok) {
            throw new Error('Something went wrong!'+Error);
        }
        const resData = await response.json();
        console.log("Edit Items:" +JSON.stringify(resData));
        const loadedItems = [];

        for (const key in resData) {
            let editItems = new Items(
                key,
                resData[key].ownerId,
                resData[key].title,
                resData[key].imageUrl,
                resData[key].description,
                resData[key].price,
                resData[key].meal,
                resData[key].category
            );
            editItems.imageData = resData[key].imageData
            loadedItems.push(
                editItems
            );
            console.log("Loaded Items: "+JSON.stringify(loadedItems));
        }
        return {
            type: EDIT_ITEMS,
            editItems: loadedItems
        }
    }
    catch (err) {
        throw err;
    }
}
};