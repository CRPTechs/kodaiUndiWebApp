import Items from '../../models/items';

export const SET_ITEMS = 'SET_ITEMS';
export const EDIT_ITEMS = 'EDIT_ITEMS';
export const FETCH_ALL_ITEMS = 'FETCH_ALL_ITEMS';

export const fetchAllItems = async () => {
    const status = 'available';
    try {
        const response = await fetch(
            `https://crpapp-default-rtdb.firebaseio.com/products.json`
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
                resData[key].title,
                resData[key].imageUrl,
                resData[key].description,
                resData[key].price,
                resData[key].meal,
                resData[key].category,
                resData[key].status
            );
            items.imageData = resData[key].imageData
            loadedItems.push(
                items
            );
        }
        return {
            type: FETCH_ALL_ITEMS,
            items: loadedItems
        }
    }
    catch (err) {
        throw err;
    }
};

export const fetchItems = async () => {
    const status = 'available';
    try {
        const response = await fetch(
            `https://crpapp-default-rtdb.firebaseio.com/products.json?orderBy="status"&equalTo="${status}"`
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
                resData[key].title,
                resData[key].imageUrl,
                resData[key].description,
                resData[key].price,
                resData[key].meal,
                resData[key].category,
                resData[key].status
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

export const dailyMenuAction = (itemId, status) => {
    return async (dispatch) => {
        const response = await fetch(
            `https://crpapp-default-rtdb.firebaseio.com/products/${itemId}.json`,
            {
                method: 'PATCH',
                headers: {  
                    'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    status
                })
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const resData = await response.json();
        dispatch({
            type: status,
            data: {
                id: itemId,
                status
            }
        });
    }
}