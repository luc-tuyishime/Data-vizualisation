import React from 'react';
import { Tag } from 'antd';

export const columns = [
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status) => (
            <>
                {status.map((tag) => {
                  let color = tag.length > 5 ? 'lime' : 'green';

                  if (tag === 'Success') {
                    color = 'green';
                  }
                  if (tag === 'pending') {
                    color = 'blue';
                  }

                  if (tag === 'fail') {
                    color = 'red';
                  }
                  return (
                        <Tag style={{ borderRadius: '30px' }} color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                  );
                })}
            </>
    )
  },
  {
    title: 'Gateway',
    dataIndex: 'gateway',
    key: 'gateway',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone'
  },

  {
    title: 'Provider',
    dataIndex: 'provider',
    key: 'provider'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: 'Liquidation status',
    key: 'liquidationStatus',
    dataIndex: 'liquidationStatus',
    render: (liquidationStatus) => (
            <>
                {liquidationStatus.map((tag) => {
                  let color = tag.length > 5 ? 'lime' : 'green';

                  if (tag === 'Success') {
                    color = 'green';
                  }
                  if (tag === 'pending') {
                    color = 'blue';
                  }

                  if (tag === 'fail') {
                    color = 'red';
                  }
                  return (
                        <Tag style={{ borderRadius: '30px' }} color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                  );
                })}
            </>
    )
  }
];
