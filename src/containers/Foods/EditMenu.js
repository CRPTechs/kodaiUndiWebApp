import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import * as itemsAction from './actions';
import './EditMenu.css';

const EditMenu = (props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.availableItems);
    console.log("Fetched items:" +JSON.stringify(items));

    const loadItems = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            let setItemsAction = await itemsAction.fetchItems();
            dispatch(setItemsAction);
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadItems()
    }, [loadItems]);

    const editItemHandler = () => {
        props.history.push('/selectedMenu');
    }

    return (
        <div className="EditMenu">
                <table className="table table-border table-stripped">
                    <thead className="thead=light"> 
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Meal</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => {
                            return <tr key={item.id}>
                                 <td>{item.title}</td>
                                 <td>{item.category}</td>
                                 <td>{item.meal}</td>
                                 <td>{item.price}</td>
                                 <td>Available</td>
                                 <button onClick={() => { dispatch(itemsAction.editItems(item.title)) }}>Edit</button>
                                 <button onClick={editItemHandler}>Aero</button>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
    )
}

// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.auth.token !== null
//     };
// };

// const mapDisptachToProps = dispatch => {
//     return {
//         onSetAuthRedirectPath: (path) => dispatch(authAction.setAuthRedirectPath(path))
//     }
// }

export default EditMenu;
