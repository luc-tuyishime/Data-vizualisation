import React, { Component } from 'react';
import { Empty } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import CustomCard from '../../card/card';
// import {
//   CustomTooltip,
//   CustomTooltipPerformance
// } from '../../common/customTooltip/customTooltip';
// import { mapArrayPerformance } from '../../../helpers/changeArrayToObject';
import { performance } from '../../../redux/actions/USSD';

import '../../dashboard/dashboard.scss';

class AreaChartLeft extends Component {
    state = { data: [] };

    componentDidMount() {
      const { performance } = this.props;
      performance();
    }

    static getDerivedStateFromProps(props) {
      const finalArray = props && props.listOfPerformance;
      return { data: finalArray };
    }

    render() {
      // console.log("THIS.PROPS ==>>", this.props);
      // const ooo = this.props.listOfPerformance;
      const { data } = this.state;
      // const obj = data.map(mapArrayPerformance);
      // console.log("DATAOOOOOO ==>>", obj);

      return (
            <div className="dashboard">
                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: '99%' }}>
                    <div>
                        <p className="sales-text">USSD Performance Indicator</p>
                        {data.length > 0 ? (
                            <ResponsiveContainer width="100%" height={270}>
                                <AreaChart
                                    width={400}
                                    height={200}
                                    data={data}
                                    syncId="anyIdd"
                                    margin={{
                                      top: 10,
                                      right: 30,
                                      left: 0,
                                      bottom: 0
                                    }}>
                                    <CartesianGrid
                                        vertical={false}
                                        horizontal
                                        strokeDasharray="1 1"
                                    />
                                    <XAxis
                                        stroke="white"
                                        tick={{
                                          fill: 'rgba(47, 63, 82, 0.5)',
                                          fontSize: 12
                                        }}
                                        dataKey="name"
                                    />
                                    <YAxis
                                        tick={{
                                          fill: 'rgba(47, 63, 82, 0.5)',
                                          fontSize: 12
                                        }}
                                        stroke="white"
                                        interval="preserveStartEnd"
                                    />
                                    <Tooltip
                                        // content={
                                        //     <CustomTooltipPerformance
                                        //         textLabel="hour"
                                        //         text="count"
                                        //     />
                                        // }
                                        cursor={true}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="count"
                                        stroke="rgba(159, 219, 253, 0.46)"
                                        fill="rgba(159, 219, 253, 0.46)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="data-empty">
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={
                                        <span>
                                            data will be displayed whenever they are ready
                                        </span>
                                    }
                                />
                            </div>
                        )}
                    </div>
                </CustomCard>
            </div>
      );
    }
}

AreaChartLeft.propTypes = {
  performance: PropTypes.func,
  listOfPerformance: PropTypes.array
};

const mapStateToProps = ({ ussd: { listOfPerformance } }) => ({ listOfPerformance });

export default connect(mapStateToProps, { performance })(AreaChartLeft);
