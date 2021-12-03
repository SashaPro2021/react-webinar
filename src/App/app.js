import React, {useState,useCallback} from 'react';
import Controls from "../components/controls";
import List from "../components/list";
import Layout from "../components/layout";
import Modal from '../components/modal';
import Cart from '../components/cart';
import CartLength from '../components/cartLength';

import './styles.css';
/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {
  console.log('App');

  const [showModal, setShowModal] = useState(false);

  const callbacks = {
    toggleModal: useCallback(() => 
      setShowModal(!showModal), [showModal, setShowModal]),
    addToCart: useCallback((code) => store.addToCart(code), [store])
  }
  
  const totalPrice = store.getState().products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalQty = store.getState().products.reduce((acc, item) => acc + item.quantity, 0);
  
  return (
    <>
    <Layout head={<h1>Магазин</h1>}>
      <div className='Wrapper'>
          <CartLength goods={store.getState().products} totalPrice={totalPrice} totalQty={totalQty}/>
        <Controls className='Controls' toggleModal={callbacks.toggleModal} title={'Перейти'} />
      </div> 
        <List items={store.getState().items} addToCart={ callbacks.addToCart}/>
      </Layout>
      
      <div>{showModal && <Modal toggleModal={callbacks.toggleModal}>
        <Cart goods={store.getState().products} toggleModal={callbacks.toggleModal} totalPrice={totalPrice} totalQty={totalQty}/></Modal>}
      </div>
      </>
  );
}

export default App;