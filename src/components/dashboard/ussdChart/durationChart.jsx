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
import { duration } from "../../../redux/actions/USSD";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { startDate } from "../../../helpers/getDifferentTime";
import { mapArrayToObject } from "../../../helpers/changeArrayToObject";
import moment from "moment";
import { connect } from "react-redux";
import { round } from "../../../helpers/roundNumber";
import { formatXAxis } from "../../../helpers/formatXaxis";

import "../../dashboard/dashboard.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

let durationChart = 1000;

class USSDAreaChartRight extends Component {
    state = {
        duration: [],
        loading: false,
        barIndex: "uv",
        left: 0,
        right: 0
    };

    componentDidMount = () => {
        const { duration } = this.props;
        duration(startDate, moment().unix());
    };

    static getDerivedStateFromProps(props) {
        return {
            duration: props && props.listOfDuration,
            loading: props && props.loading
        };
    }

    render() {
        const { handleChange } = this.props;
        const { duration, loading, barIndex, animation, left, right } = this.state;

        const mapIt = duration.map((v) => v.values);

        const [Array] = mapIt;

        var objs = Array && Array.map(mapArrayToObject);

        const getUVvalue = objs && objs.map((v) => v.uv);

        const val = getUVvalue && getUVvalue.slice(-1)[0];

        return (
            <div className="dashboard">
                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "99%" }}>
                    <div>
                        <p className="sales-text">Duration</p>
                        {loading && (
                            <Spin className="spin-position-chart" indicator={antIcon} />
                        )}
                        <ResponsiveContainer width="100%" height={270}>
                            <AreaChart
                                onChange={handleChange}
                                width={400}
                                height={200}
                                data={objs}
                                syncId="anyIdd21231"
                                margin={{
                                    top: 10,
                                    right: 40,
                                    left: 0,
                                    bottom: 0
                                }}>
                                <CartesianGrid
                                    vertical={false}
                                    horizontal
                                    strokeDasharray="1 1"
                                />
                                <XAxis
                                    // dx={70}
                                    minTickGap={30}
                                    stroke="white"
                                    tickFormatter={formatXAxis}
                                    tick={{
                                        fill: "rgba(47, 63, 82, 0.5)",
                                        fontSize: 12
                                    }}
                                    dataKey="name"
                                    padding={{ left: left, right: right }}
                                    domain={["dataMin -5", "dataMax + 5"]}
                                />
                                <YAxis
                                    dy={-5}
                                    domain={["auto", "auto"]}
                                    orientation="left"
                                    tickFormatter={(label) => `${label} ms`}
                                    tick={{
                                        fill: "rgba(47, 63, 82, 0.5)",
                                        fontSize: 12
                                    }}
                                    stroke="white"
                                    interval="preserveStartEnd"
                                />
                                <Tooltip
                                    content={
                                        <CustomTooltip
                                            text="- HTTP - AVG"
                                            textRight="ms"
                                        />
                                    }
                                    cursor={true}
                                />
                                <Area
                                    animationDuration={durationChart}
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
                            <span className="text-footer-http">HTTP AVG Current: </span>
                            <span className="val-style">
                                {!isNaN(val) ? round(val, 2) : ""}
                            </span>{" "}
                            ms
                        </div>
                    </div>
                </CustomCard>
            </div>
        );
    }
}

const mapStateToProps = ({
    ussd: {
        listOfDuration,
        fetchDuration: { loading, message, errors }
    }
}) => ({
    listOfDuration,
    loading,
    message,
    errors
});

export default connect(mapStateToProps, { duration })(USSDAreaChartRight);
