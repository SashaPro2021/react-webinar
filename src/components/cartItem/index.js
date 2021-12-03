import React from "react"; 
import propTypes from 'prop-types';

import './styles.css';

function CartItem({ good }) {
    console.log('Good', good);
    return (
        <div className='Cart__item'>
            <div className='Cart__code'>{good.code}</div>
            <div className='Cart__name'>{good.title}</div>
            <div className='Cart__price'>{good.price} <span>&#x20bd;</span> </div>
            <div className='Cart__quontity'>{good.quantity} шт </div> 
        </div>
    )
}
CartItem.propTypes = {
  good: propTypes.object.isRequired,
};
export default CartItem; 