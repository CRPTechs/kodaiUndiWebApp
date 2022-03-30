import React, { useState } from 'react';
import AddCategory from '../Category/AddCategory';
import AddMenu from '../Foods/AddMenu';
import EditMenu from '../Foods/EditMenu';
import SelectedMenu from '../Foods/SelectedMenu';
import Orders from '../ViewOrders/ViewOrders';
import './Admin.css';

const Admin = () => {
    const [isSelected, setIsSelected] = useState('Orders List');
    const selectHandler = (option) => {
        setIsSelected(option);
    }
    return (
        <div>
        <div className='adminContainer'> 
            <div className={isSelected === 'Orders List' ? 'optionSelected' : 'orderListCon'} onClick={() => selectHandler('Orders List')}>Orders List</div>
            <div className={isSelected === 'Add Menu' ? 'optionSelected' : 'addMenuCon'} onClick={() => selectHandler('Add Menu')}>Add Menu</div>
            <div className={isSelected === 'Add Category' ? 'optionSelected' : 'addCatCon'} onClick={() => selectHandler('Add Category')}>Add Category</div>
            <div className={isSelected === 'Daily Menu' ? 'optionSelected' : 'dailyMenuCon'} onClick={() => selectHandler('Daily Menu')}>Daily Menu</div>
        </div>
        {isSelected === 'Orders List' && 
            <Orders />}
        {isSelected === 'Add Menu' && 
            <AddMenu />}
        {isSelected === 'Add Category' && 
            <AddCategory />}
        {isSelected === 'Daily Menu' && 
            <SelectedMenu />}
        </div>
    )
}

export default Admin;