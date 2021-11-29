import React from "react"; 
import Controls from '../controls/index';
import CartList from '../cartList';
import propTypes from 'prop-types';
import './styles.css';

function Cart({ goods, toggleModal }) {
    const totalCost = goods.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalQty = goods.reduce((sum, item) => sum + item.quantity, 0)
    return (
        <div className='Cart'>
            <div className='Cart__header'>
                <h1 className='Cart__title'>Корзина</h1>
                <Controls className='Cart__close' toggleModal={toggleModal} title={'Закрыть'} />
            </div>
            <div className='Cart__line'></div>
            <CartList goods={goods} /> 
             <div className='Cart__subtotal'> 
                <div className='Cart__subtitle'>Итого</div> 
                <div className='Cart__cost'>{totalCost} <span>&#x20bd;</span> </div>
                <div className='Cart__qty'>{totalQty} шт </div>     
            </div>
        </div>
    )
}
Cart.propTypes = {
    goods: propTypes.arrayOf(propTypes.object).isRequired,
    toggleModal: propTypes.func.isRequired,
}

Cart.defaultProps = {
    goods: [],
    toggleModal: () => {},
}
export default Cart; 