import React, { Component } from "react";
import CustomCard from "../../card/card";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { CustomTooltip } from "../../common/customTooltip/customTooltip";
import { getRate } from "../../../redux/actions/USSD";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { mapArrayToObject } from "../../../helpers/changeArrayToObject";
import moment from "moment";
import { connect } from "react-redux";
import { round } from "../../../helpers/roundNumber";
import { formatXAxis } from "../../../helpers/formatXaxis";
import { startDate } from "../../../helpers/getDifferentTime";

import "../../dashboard/dashboard.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

let duration = 1000;

class USSDAreaChartLeft extends Component {
    state = {
        rate: [],
        barIndex: "uv",
        loading: false,
        endDate: moment().unix()
    };

    componentDidMount = () => {
        const { getRate } = this.props;
        getRate(startDate, moment().unix());
    };

    static getDerivedStateFromProps(props) {
        return {
            rate: props && props.listOfRate,
            loading: props && props.loading
        };
    }

    render() {
        const { handleChange } = this.props;
        const { rate, loading, barIndex, animation } = this.state;

        const mapIt = rate.map((v) => v.values);

        const [Array] = mapIt;

        let objs = Array && Array.map(mapArrayToObject);

        const getUVvalue = objs && objs.map((v) => v.uv);

        const val = getUVvalue && getUVvalue.slice(-1)[0];

        return (
            <div className="dashboard">
                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "99%" }}>
                    <div>
                        <p className="sales-text">Rate</p>

                        {loading && (
                            <Spin className="spin-position-chart" indicator={antIcon} />
                        )}
                        <ResponsiveContainer width="100%" height={270}>
                            <AreaChart
                                onChange={handleChange}
                                width={90}
                                height={300}
                                data={objs}
                                syncId="anyIdd2">
                                <CartesianGrid
                                    vertical={false}
                                    horizontal
                                    strokeDasharray="1 1"
                                />
                                <XAxis
                                    minTickGap={30}
                                    stroke="white"
                                    tickFormatter={formatXAxis}
                                    tick={{
                                        fill: "rgba(47, 63, 82, 0.5)",
                                        fontSize: 12
                                    }}
                                    dataKey="name"
                                />
                                <YAxis
                                    domain={["auto", "auto"]}
                                    orientation="left"
                                    tickFormatter={(label) => `${label} ops`}
                                    tick={{
                                        fill: "rgba(47, 63, 82, 0.5)",
                                        fontSize: 12
                                    }}
                                    stroke="white"
                                    interval="preserveStartEnd"
                                />
                                <Tooltip
                                    content={
                                        <CustomTooltip text="- HTTP" textRight="ops" />
                                    }
                                    cursor={true}
                                />
                                <Area
                                    animationDuration={duration}
                                    isAnimationActive={animation}
                                    type="monotone"
                                    dataKey={barIndex}
                                    stroke="#40c4ff"
                                    fill="rgba(159, 219, 253, 0.25)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <div className="footer-contain">
                            <span>
                                {" "}
                                <hr className="new4" />{" "}
                            </span>
                            <span className="text-footer-http">HTTP Current: </span>
                            <span className="val-style">
                                {!isNaN(val) ? round(val, 4) : ""}
                            </span>{" "}
                            ops
                        </div>
                    </div>
                </CustomCard>
            </div>
        );
    }
}

const mapStateToProps = ({
    ussd: {
        listOfRate,
        fetchRate: { loading, message, errors }
    }
}) => ({
    listOfRate,
    loading,
    message,
    errors
});

export default connect(mapStateToProps, { getRate })(USSDAreaChartLeft);
