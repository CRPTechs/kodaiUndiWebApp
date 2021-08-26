import Accomodation  from "../../models/accomodation";

export const FETCH_ACCOMODATION = 'FETCH_ACCOMODATION';

export const fetchAccomodation = async () => {
    try {
        const response = await fetch(
            'https://crpapp-default-rtdb.firebaseio.com/accomodation.json'
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        console.log("Fetched accomodation: " +JSON.stringify(resData));
        const loadedAccomodation = [];

        for (const key in resData) {
            let accomodation = new Accomodation(
                key,
                resData[key].about,
                resData[key].address,
                resData[key].amenities,
                resData[key].cabGuide,
                resData[key].foods,
                resData[key].name,
                resData[key].nearby,
                resData[key].persons,
                resData[key].price
            );
            loadedAccomodation.push(
                accomodation
            );
        }
        return {
            type: FETCH_ACCOMODATION,
            accomodation: loadedAccomodation
        }
    }
    catch (err) {
        throw err;
    }
}