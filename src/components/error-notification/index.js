import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

function ErrorNotification(props) {
    return (
        <p className='Error'>{props.children}</p>
    )
};

ErrorNotification.propTypes = {
    children: PropTypes.node,

}
export default React.memo(ErrorNotification);
