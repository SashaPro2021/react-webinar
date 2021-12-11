import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import numberFormat from "../../utils/number-format";
import Layout from '../layout';
import BasketSimple from '../basket-simple';
import propTypes from 'prop-types';

import './style.css'

function DetailsProduct({onAdd, onOpen, amount, sum}) {
 
    const [product, setProduct] = useState({});
    let params = useParams();
    const id = params.id;
 
    useEffect(async () => {
    const response = await fetch(`api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
        const json = await response.json();
        setProduct({ ...json.result })
        return () => { setProduct({})};
    }, [id]);

    return (
        <Layout head={<h1>{product.title}</h1>}>
            <BasketSimple onOpen={onOpen} amount={amount} sum={sum}/>
            <div className="DetailsProduct">
                <div className='DetailsProduct__content'>{product.description}</div>
                <div className='DetailsProduct__content'>Страна производитель: <span className='DetailsProduct__text'>{`${product.maidIn?.title} ${''} (${product.maidIn?.code})`}</span> </div>
                <div className='DetailsProduct__content'>Категория: <span className='DetailsProduct__text'>{product.category?.title}</span> </div>
                <div className='DetailsProduct__content'>Год выпуска:<span className='DetailsProduct__text'>{product.edition}</span></div>
                <div className='DetailsProduct__content'><span className='DetailsProduct__text_format'>Цена: {numberFormat(product.price)} ₽</span></div>
            </div>
          <button type='button' className='Btn' onClick={() => onAdd(id)}>Добавить</button> 
        </Layout>
    )
}

DetailsProduct.propTypes = {
   sum: propTypes.number,
    amount: propTypes.number,
    onAdd: propTypes.func,
  onOpen: propTypes.func
}

DetailsProduct.defaultProps = {
      sum: 0,
     amount: 0,
    onAdd: () => { },
    onOpen: () => { }
}

export default DetailsProduct;