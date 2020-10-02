import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

const CustomCard = ({ children, ...otherProps }) => (
    <div>
        <Card {...otherProps}>{children}</Card>
    </div>
);

CustomCard.propTypes = { children: PropTypes.any };

export default CustomCard;
