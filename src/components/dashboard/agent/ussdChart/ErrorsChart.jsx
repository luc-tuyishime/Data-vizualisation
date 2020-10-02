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
import { errors } from "../../../../redux/actions/USSD";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { mapArrayToObject } from "../../../../helpers/changeArrayToObject";
import { startDate } from "../../../../helpers/getDifferentTime";
import moment from "moment";
import { connect } from "react-redux";
import { round } from "../../../../helpers/roundNumber";
import { formatXAxis } from "../../../../helpers/formatXaxis";

import "../../../dashboard/dashboard.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

class USSDAreaChartCenter extends Component {
    state = {
        errors: [],
        loading: false
    };

    componentDidMount = () => {
        const { errors } = this.props;
        errors(startDate, moment().unix());
    };

    static getDerivedStateFromProps(props) {
        return {
            errors: props && props.listOfError,
            loading: props && props.loading
        };
    }

    render() {
        const { errors, loading } = this.state;

        const mapIt = errors.map((v) => v.values);

        const [Array] = mapIt;

        var objs = Array && Array.map(mapArrayToObject);

        const getUVvalue = objs && objs.map((v) => v.uv);

        const val = getUVvalue && getUVvalue.slice(-1)[0];

        return (
            <div className="dashboard">
                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "98%", height: "415px" }}>
                    <div>
                        <p className="sales-text">Errors</p>
                        <ResponsiveContainer width="100%" height={270}>
                            {loading ? (
                                <div className="center-spin-vertically">
                                    <Spin indicator={antIcon} />
                                </div>
                            ) : errors && errors.length === 0 ? (
                                <div className="center-spin-vertically">
                                    <p className="no-data">No data..</p>
                                </div>
                            ) : (
                                <AreaChart
                                    width={300}
                                    height={200}
                                    data={objs}
                                    syncId="anyIdd222"
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
                                        content={
                                            <CustomTooltip
                                                text="- HTTP"
                                                textRight="ops"
                                            />
                                        }
                                        cursor={true}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="uv"
                                        stroke="rgba(159, 219, 253, 0.46)"
                                        fill="rgba(159, 219, 253, 0.46)"
                                    />
                                </AreaChart>
                            )}
                        </ResponsiveContainer>
                        <span></span>
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
        listOfError,
        fetchError: { loading, message, errors }
    }
}) => ({
    listOfError,
    loading,
    message,
    errors
});

export default connect(mapStateToProps, { errors })(USSDAreaChartCenter);
