import React from "react"; 
import Controls from "../controls";
import CartLength from '../cartLength';

import './styles.css';

function CartInfo({goods, totalPrice, totalQty, toggleModal}) {
    return (
     <div className='Wrapper'> 
        <CartLength goods={goods} totalPrice={totalPrice} totalQty={totalQty}/>
            <Controls className='Controls' title={'Перейти'} toggleModal={toggleModal}/>
     </div>  
    )
}
export default CartInfo