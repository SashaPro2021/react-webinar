import React from "react";
import numberFormat from "../../utils/number-format";
import propTypes from 'prop-types';

import './style.css'

function DetailsProduct({item, onAdd, id}) {;

    return (
        <>
            <div className="DetailsProduct">
                <div className='DetailsProduct__content'>{item.description}</div>
                <div className='DetailsProduct__content'>Страна производитель: <span className='DetailsProduct__text'>{`${item.maidIn?.title} ${''} (${item.maidIn?.code})`}</span> </div>
                <div className='DetailsProduct__content'>Категория: <span className='DetailsProduct__text'>{item.category?.title}</span> </div>
                <div className='DetailsProduct__content'>Год выпуска:<span className='DetailsProduct__text'>{item.edition}</span></div>
                <div className='DetailsProduct__content'><span className='DetailsProduct__text_format'>Цена: {numberFormat(item.price)} ₽</span></div>
            </div>
            <button type='button' className='Btn' onClick={() => onAdd(id)}>Добавить</button> 
         </>
    )
}

DetailsProduct.propTypes = {
    item: propTypes.object.isRequired,
    id: propTypes.string.isRequired,
    onAdd: propTypes.func,
}

DetailsProduct.defaultProps = {
    item: {},
    onAdd: () => { },
}

export default DetailsProduct;