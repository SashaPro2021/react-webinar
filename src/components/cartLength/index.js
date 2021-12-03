import React from "react";
import plural from 'plural-ru';
import propTypes from 'prop-types';

import './styles.css';

function CartLength({ goods, totalPrice, totalQty}) {
    return (
        <div className='Total' > В корзине: {  goods.length !== 0 ?
            <div className='Total__quontity'> {totalQty} {plural(totalQty, 'товар', 'товара', 'товаров')} <span>&#8260;</span> {totalPrice} <span>&#x20bd;</span> </div> : <div className='Empty'>пусто</div>}
         </div >
    )
}
CartLength.propTypes = {
    goods: propTypes.arrayOf(propTypes.object).isRequired,
}

CartLength.defaultProps = {
    goods: [],
}
export default CartLength;