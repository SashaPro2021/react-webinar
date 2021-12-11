import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';

import { NavLink } from "react-router-dom";

function ItemBasket({item, onClose}) {
  return (
    <div className='ItemBasket'>
      <div className='ItemBasket__number'>{parseInt(item._key) + 1}</div>
      <NavLink to={item._id} className='ItemBasket__link' onClick={onClose}>
      <div className='ItemBasket__title'>{item.title}</div>
      </NavLink>
      <div className='ItemBasket__right'>
        <span className="ItemBasket__cell">{numberFormat(item.price || 0)} ₽</span>
        <span className="ItemBasket__cell">{numberFormat(item.amount || 0)} шт</span>
      </div>
    </div>
  )
}


ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);
