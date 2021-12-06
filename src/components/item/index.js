import React, {useCallback, useState} from "react";
import propTypes from 'prop-types';
import './styles.css';

function Item({ item, addToCart }) {
  
  const onClick = (code) => {
    addToCart(code);
  };
  return (
    <div className='Item'>
      <div className='Item__number'>{item.code}</div>
      <div className='Item__title'>
        {item.title}
      </div>
       <div className='Item__price'>
        {item.price}
        <span>&#x20bd;</span>
      </div>
      <div className='Item__actions'>
        <button onClick={() => onClick(item.code)}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
}

Item.defaultProps = {
  onClick: () => {},
}

export default React.memo(Item);