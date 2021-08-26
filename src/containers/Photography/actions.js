import Photography from "../../models/photgraphy";

export const FETCH_PHOTOGRAPHY = 'FETCH_PHOTOGRAPHY';

export const fetchPhotography = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch('https://crpapp-default-rtdb.firebaseio.com/photography.json');
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
            const resData = await response.json();
            console.log('Photography List:' +JSON.stringify(resData));
            const loadedPhotography = [];
            for (const key in resData) {
                let photography = new Photography(
                    key,
                    resData[key].name,
                    resData[key].description,
                    resData[key].price,
                    resData[key].picCount
                );
                loadedPhotography.push(
                    photography
                );
            }
            dispatch({
                type: FETCH_PHOTOGRAPHY,
                photography: loadedPhotography,
            });
        }
        catch(err) {
            throw err;
        } 
    }
}