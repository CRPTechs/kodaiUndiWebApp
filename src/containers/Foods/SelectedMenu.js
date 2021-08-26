import React,{ useState,useCallback,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as itemsAction from './actions';

const SelectedMenu = (props) => {
    const dispatch = useDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    console.log("Props:" +JSON.stringify(props));
    const selectedMenu = useSelector(state => state.items.editItems);
    console.log("Selected Item: "+JSON.stringify(selectedMenu));

    const editItems = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            let setItemsAction = await itemsAction.editItems();
            dispatch(setItemsAction);
            console.log(setItemsAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        editItems()
    }, [editItems]);

    return (
        <div>
            <h4>Selected Item</h4>
        </div>
    )
}

export default SelectedMenu;