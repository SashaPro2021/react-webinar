import React from "react";
import propTypes from 'prop-types';
import './styles.css';


function Controls({ className, title, toggleModal }) {
  console.log('Controls');
  return <div className={`${className}`}>
     <button type='button' className='Btn' onClick={toggleModal}> {title} </button>
  </div>
}
Controls.propTypes = {
  className: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  toggleModal: propTypes.func.isRequired
}

Controls.defaultProps = {
  toggleModal: () => {}
}

export default React.memo(Controls);