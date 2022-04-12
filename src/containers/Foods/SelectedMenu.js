import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as itemsAction from './actions';
import './SelectedMenu.css';

const SelectedMenu = (props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const allItems = useSelector(state => state.foods.allItems);
    console.log(allItems);

    const loadItems = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            let setItemsAction = await itemsAction.fetchAllItems();
            dispatch(setItemsAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);
    useEffect(() => {
        loadItems()
    }, [loadItems]);

    const statusHandler = (e, id) => {
        const status = e.target.value;
        dispatch(itemsAction.dailyMenuAction(id,status));
    }

    return (
        <div className='allItemsContainer'>
            <table className="table table-border table-stripped">
                <thead className="thead-light">
                    <tr>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allItems.map(items =>
                            <tr key={items.id}>
                                <td>{items.category}</td>
                                <td>{items.title}</td>
                                <td>Rs. {items.price}</td>
                                <select name='Status' className='' value={items.status} onChange={(e) => statusHandler(e,items.id)}>
                                    <option value='available'>Available</option>
                                    <option value='unavailable'>Unavailable</option>
                                </select>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SelectedMenu;