import React, { useEffect, useCallback } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import Layout from '../../components/layout';
import DetailsProduct from '../../components/detailsProduct';
import BasketSimple from '../../components/basket-simple';

function Product() {

  const select = useSelector(state => ({
    product: state.product.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  
    let params = useParams();
    const id = params.id;
  
   const store = useStore();
 
    useEffect(async () => {
       await store.product.getProduct(id);
    }, [id]);


     const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store])
  }
   
    return (
        <Layout head={<h1>{select.product.title}</h1>}>
            <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum} />
            <DetailsProduct item={select.product} onAdd={callbacks.addToBasket} id={id}/>
        </Layout>
    )
}

export default React.memo(Product);