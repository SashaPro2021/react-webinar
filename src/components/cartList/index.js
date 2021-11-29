import React from "react"; 
import CartItem from '../cartItem';
import propTypes from 'prop-types';

function CartList({ goods }) {
  console.log('Goods', CartItem);
    return (
      <div className='Cart__list'> {goods.map((good) => {
           return <CartItem key={good.code} good={good}/>
         })}
         </div> 
    )
}
CartList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
}

CartList.defaultProps = {
  items: [],
}
export default CartList;