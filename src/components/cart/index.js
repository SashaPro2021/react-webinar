import React from "react"; 
import Controls from '../controls/index';
import CartList from '../cartList';
import propTypes from 'prop-types';
import './styles.css';

function Cart({ goods, toggleModal, totalPrice, totalQty }) {
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
                <div className='Cart__cost'>{totalPrice} <span>&#x20bd;</span> </div>
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
export default React.memo(Cart); 