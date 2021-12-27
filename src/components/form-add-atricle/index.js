import React, {useCallback} from "react";
import ErrorNotification from '../error-notification';
import Textarea from '../textarea';
import Input from '../input';
import Select from '../select';
import { cn } from '@bem-react/classname';

import { unflat, nestedList} from '../../utils/create-nested-list';

import './style.css';

function FormAddArticle({ data, error, errorInfo, options, countries, onChange, handleSubmit }) {

    const className = cn('Form');

    const source = unflat(options);

    const newList = nestedList(source, 0, '-');

    const arrCategory = newList.slice(1, 11);

    const onChangeHandler = useCallback(name => {
    // Возвращаем функцию с замыканием на имя и значение
    return (value) => onChange(name,value);
    }, [onChange]);

    return (
        <div className={className()}>
        <form onSubmit={handleSubmit}>
            <div className={className('Wrapper')}>
                <label className={className('Label')}>Наименование товара
                <Input type="text" value={data.name} theme='big' onChange={onChangeHandler('name')}/>
                </label>
            </div>  
            <div className={className('Wrapper')}>
                <label className={className('Label')}>Название 
                <Input type="text" value={data.title} theme='big' onChange={onChangeHandler('title')}/>
                </label>
            </div>  
            <div className={className('Wrapper')}>
                <label  className={className('Label')}> Описание 
                <Textarea rows={10} value={data.description}  onChange={onChangeHandler('description')}/>
                </label>
            </div>
            <div className={className('Wrapper')}>
                <label  className={className('Label')}> Страна производитель 
                    <Select className={className('Select')} theme='big' value={data.maidIn} onChange={onChangeHandler('maidIn')} options={countries}/>
                </label>
            </div>
            <div className={className('Wrapper')}>
            <label className={className('Label')}> Категория  
                <Select  className={className('Select')} theme='big' value={data.category} onChange={onChangeHandler('category')} options={arrCategory}/>
                </label>
            </div>
            <div className={className('Wrapper')}>
                <label  className={className('Label')}>Год выпуска 
                <Input  className={className('Input_size')} theme='big' type="number" value={data.edition} onChange={onChangeHandler('edition')}/>
                </label>
            </div>
            <div className={className('Wrapper')}>
                <label className={className('Label')}>Цена (&#8381;)  
                    <Input  className={className('Input_size')} theme='big' type="number" value={data.price} onChange={onChangeHandler('price')}/>
                </label>
            </div>
            <div className={className('Wrapper')}>
                <button className={className('Btn')} type="submit">Добавить</button>
            </div>
            {error && <ErrorNotification>
                <div>{`${error}:`}</div>  
                <div><ul> {errorInfo.map(item => <li >{`${item.message} ---> (${item.path})`} </li> )} </ul></div>
            </ErrorNotification>}  
        </form>
    </div>
)
}
export default React.memo(FormAddArticle);
