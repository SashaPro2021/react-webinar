import React from "react";
import propTypes from 'prop-types';
import Item from "../item";
import './styles.css';

function List({items, addToCart}){
  console.log('List', items);
  return (
    <div className='List'>{items.map(item =>
      <div className='List__item' key={item.code}>
        <Item item={item} addToCart={addToCart}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  addToCart: propTypes.func.isRequired,
}

List.defaultProps = {
  items: [],
  addToCart: () => {},
}

export default React.memo(List);