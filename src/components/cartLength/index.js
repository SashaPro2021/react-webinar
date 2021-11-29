import React from "react";
import plural from 'plural-ru';
import propTypes from 'prop-types';

import './styles.css';

function CartLength({ goods }) {
    const totalCost = goods.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalQty = goods.reduce((sum, item) => sum + item.quantity, 0)
    return (
        <div className='Total' > В корзине: {  goods.length !== 0 ?
            <div className='Total__quontity'> {totalQty} {plural(totalQty, 'товар', 'товара', 'товаров')} <span>&#8260;</span> {totalCost} <span>&#x20bd;</span> </div> : <div className='Empty'>пусто</div>}
         </div >
    )
}
CartLength.propTypes = {
    goods: propTypes.arrayOf(propTypes.object).isRequired,
}

CartLength.defaultProps = {
    goods: [],
}
export default React.memo(CartLength);