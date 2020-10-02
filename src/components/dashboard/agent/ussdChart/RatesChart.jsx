import React, { Component } from "react";
import CustomCard from "../../../card/card";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { CustomTooltip } from "../../../common/customTooltip/customTooltip";
import { getRateAgent } from "../../../../redux/actions/USSD";
import { startDate } from "../../../../helpers/getDifferentTime";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { mapArrayToObject } from "../../../../helpers/changeArrayToObject";
import moment from "moment";
import { connect } from "react-redux";
import { round } from "../../../../helpers/roundNumber";
import { formatXAxis } from "../../../../helpers/formatXaxis";

import "../../../dashboard/dashboard.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

class USSDAreaChartLeft extends Component {
    state = {
        rate: [],
        loading: false
    };

    componentDidMount = () => {
        const { getRateAgent } = this.props;
        getRateAgent(startDate, moment().unix());
    };

    static getDerivedStateFromProps(props) {
        return {
            rate: props && props.listOfRateAgent,
            loading: props && props.loading
        };
    }

    render() {
        const { handleChange } = this.props;
        const { rate, loading } = this.state;

        const mapIt = rate.map((v) => v.values);

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
                        <p className="sales-text">Rate</p>

                        {loading && (
                            <Spin className="spin-position-chart" indicator={antIcon} />
                        )}
                        <ResponsiveContainer width="100%" height={270}>
                            <AreaChart
                                onChange={handleChange}
                                width={400}
                                height={200}
                                data={objs}
                                syncId="anyIdd2"
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
                                    // labelFormatter={(name) => "Time Taken: " + name}
                                    // labelFormatter={(name) => "Text: " + name}
                                    content={
                                        <CustomTooltip text="- HTTP" textRight="ops" />
                                    }
                                    cursor={true}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="uv"
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
        listOfRateAgent,
        fetchRateAgent: { loading, message, errors }
    }
}) => ({
    listOfRateAgent,
    loading,
    message,
    errors
});

export default connect(mapStateToProps, { getRateAgent })(USSDAreaChartLeft);
