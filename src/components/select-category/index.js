import React, { useCallback } from 'react';
import { unflat, nestedList} from '../../utils/create-nested-list';
import './style.css';

function SelectCategory({ onChange, value, options }) {

  const source = unflat(options);
  const newList = nestedList(source, 0, '-')
  
    const onSelect = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);

  return (
      <select className='Select' onChange={onSelect} value={value}>
          {newList.map(item => <option key={item._id} value={item._id}>{item.title}</option>
          )}
    </select>
  )
}

export default React.memo(SelectCategory);
