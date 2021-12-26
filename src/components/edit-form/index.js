import React from "react";
import ErrorNotification from '../error-notification';
import { cn } from '@bem-react/classname';

import { unflat, nestedList} from '../../utils/create-nested-list';

import './style.css';

function EditForm({data, options, error, errorInfo, countries, handleChange, handleSubmit }) {
  
    const className = cn('Form');
   
    const sortedData = countries.sort((a, b) => a.title.localeCompare(b.title));

    const source = unflat(options);

    const newList = nestedList(source, 0, '-');

    const arrCategory = newList.slice(1, 11);

    return (
        <div className={className()}>
            <form onSubmit={handleSubmit}>
                <div className={className('Title')}>
                    <label htmlFor='title' className={className('Label')}>Название </label>
                    <input id='title' className={className('Input')} type="text" name='title' value={data.title} onChange={handleChange}/>
                </div>  

                <div className={className('Description')}>
                    <label htmlFor='descr' className={className('Label')}> Описание </label>
                    <textarea id='descr' rows={7} className={className('Textarea')} name='description' value={data.description} onChange={handleChange}>{data.description}</textarea>
                </div>
                <div className={className('Country')}>
                    <label htmlFor='select' className={className('Label')}> Страна производитель </label>
                     <select id='select' className={className('Select')} name='country' value={data.country} onChange={handleChange}>
                        {sortedData.map(country => 
                            <option key={country._id} value={country._id}>{country.title + ' ' + `(${country.code})`}</option>
                        )} 
                    </select>
                </div>

                <div className={className('Category')}>
                <label htmlFor='select' className={className('Label')}> Категория  </label>
                 <select id='select' className={className('Select')}  name='categoryGood' value={data.categoryGood} onChange={handleChange}>
                        {arrCategory.map(category =>
                            <option key={category._id} value={category._id}>{category.title}</option>
                        )}
                </select>
                </div>

                <div className={className('Edition')}>
                    <label htmlFor='edition' className={className('Label')}>Год выпуска </label>
                    <input id='edition' className={className('Input_size')} type="text" name='edition' value={data.edition} onChange={handleChange}/>
                </div>

                <div className={className('Price')}>
                    <label htmlFor='price' className={className('Label')}>Цена (&#8381;)  </label>
                     <input id='price' className={className('Input_size')} type="text" name='price' value={data.price} onChange={handleChange}/>
                </div>
                <div className={className('Save')}>
                    <button className={className('Btn')} type="submit">Сохранить</button>
                </div>
                {error && <ErrorNotification>
                <div>
                    <p>{`${error}:`}</p>  
                     <ul>
                            {errorInfo.map(item => <li>{`${item.message} ---> (${item.path})`} </li> )}
                    </ul>
                 </div>
             
              </ErrorNotification>}  
            </form>
      </div>
    )
}



export default React.memo(EditForm);