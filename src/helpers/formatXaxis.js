import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export const formatXAxis = (tickItem) => moment.unix(tickItem).format('HH:mm');

export const CustomLabelList = (props) => {
  const { x, y, fill, value, children } = props;

  return (
        <text x={x} y={y} dy={25} dx={25} fill={fill} fontSize={12} textAnchor="middle">
            {value} {children}
        </text>
  );
};

CustomLabelList.propTypes = {
  x: PropTypes.string,
  y: PropTypes.string,
  fill: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.string
};
