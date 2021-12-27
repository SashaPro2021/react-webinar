import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

function ErrorNotification(props) {
    return (
        <div className='Error'>{props.children}</div>
    )
};

ErrorNotification.propTypes = {
    children: PropTypes.node,

}
export default React.memo(ErrorNotification);
