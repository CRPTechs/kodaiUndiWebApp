import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as itemsAction from './actions';
import AccomodationModal from '../../components/Accomodation/AccomodationModal';
import AccomodationDetail from '../../components/Accomodation/AccomodationDetail';
import { Modal, Button } from 'react-bootstrap';

const Accomodation = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const accomodation = useSelector(state => state.accomodations.availableAccomodation);
    const [id, setId] = useState();
    const [address, setAddress] = useState();
    const [amenities, setAmenities] = useState();
    const [cabGuide, setCabGuide] = useState();
    const [foods, setFoods] = useState();
    const [name, setName] = useState();
    const [nearby, setNearby] = useState();
    const [persons, setPersons] = useState();
    const [price, setPrice] = useState();
    const [detailsShow, setDetailsShow] = useState();

    const loadedAccomodation = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try { 
            let setAccomodationAction = await itemsAction.fetchAccomodation();
            dispatch(setAccomodationAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadedAccomodation()
    }, [loadedAccomodation]);

    const showDetailsHandler = (id,about,address,amenities,cabGuide,foods,name,nearby,persons,price) => {
        setId(id);
        setAddress(address);
        setAmenities(amenities);
        setCabGuide(cabGuide);
        setFoods(foods);
        setName(name);
        setNearby(nearby);
        setPersons(persons);
        setPrice(price);
        setDetailsShow(true);
    }

    return(
        <>
            <Modal show={detailsShow} onHide={() => {setDetailsShow(false)}} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AccomodationDetail 
            id={id}
            address={address}
            amenities={amenities}
            cabGuide={cabGuide}
            foods={foods}
            name={name}
            nearby={nearby}
            persons={persons}
            price={price}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setDetailsShow(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div style={{ width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    padding: '10px',
    marginTop: '7%'}}>
            {accomodation.map(accomodation => 
             <AccomodationModal 
             about={accomodation.about}
             address={accomodation.address}
             amenities={accomodation.amenities}
             cabGuide={accomodation.cabGuide}
             foods={accomodation.foods}
             name={accomodation.name}
             nearby={accomodation.nearby}
             persons={accomodation.persons}
             price={accomodation.price}>
                 <button className="OrderButton" onClick={() =>
                    {showDetailsHandler(accomodation.id,
                                        accomodation.about,
                                        accomodation.address,
                                        accomodation.amenities,
                                        accomodation.cabGuide,
                                        accomodation.foods,
                                        accomodation.name,
                                        accomodation.nearby,
                                        accomodation.persons,
                                        accomodation.price)}}>Details</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <button className="OrderButton">Book</button>
                 </AccomodationModal>   )}
        </div>
        </>
    )
};

export default Accomodation;