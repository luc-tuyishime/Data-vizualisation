import React from 'react';
import PropTypes from 'prop-types';

const CustomizedLabel = ({ x, y, value }) => (
    <text
        x={x}
        y={y}
        dy={-4}
        fontSize="11"
        marginleft="10px"
        fontFamily="sans-serif"
        fill="#2F3F52">
        {value}M
    </text>
);

CustomizedLabel.propTypes = {
  x: PropTypes.string,
  y: PropTypes.string,
  value: PropTypes.string
};

export default CustomizedLabel;
