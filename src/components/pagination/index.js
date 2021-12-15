import React from "react";
import propTypes from 'prop-types';
import './style.css';

function Pagination({limit, count, paginate, currentPage}) {
 const pages = [];
  for (let i = 1; i <= (count / limit); i++) {
    pages.push(i);
  }

    return (
     <div>
        <ul className="Pagination">{pages.map(number =>
          <li className={number === currentPage ? 'Pagination__item_active' : 'Pagination__item'} key={number} onClick={() => paginate(number)}>
            <span className='Number'>{number}</span>
          </li>)}
        </ul>
    </div>
    )
}

Pagination.propTypes = {
  limit: propTypes.number.isRequired,
  count: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  paginate: propTypes.func,
}

Pagination.defaultProps = {
  paginate: () => { },
  limit: 10,
  count: 100,
  currentPage: 1
}

export default React.memo(Pagination);