import React, {useCallback} from 'react';
import './style.css';

function SelectCategory({ onChange, value, options }) {

    const onSelect = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);

    const spaceSymbol = '- ';
    const level = 0;
    const nextLevel = level + 1;
        
  return (
      <select className='Select' onChange={onSelect} value={value}>
          {options.map(item => {
              return [
                !item.parent && <option key={item._id} value={item._id}>{item.title}</option>,
                item.parent && <option key={item._id} value={item._id}>{spaceSymbol.repeat(nextLevel)}{item.title}</option>
          ]} 
           
          )}
    </select>
  )
}

export default React.memo(SelectCategory);
