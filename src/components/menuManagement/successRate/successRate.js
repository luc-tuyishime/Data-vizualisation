import React, { Component } from "react";
import { Spin } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import CustomCard from "../../card/card";

import "../../dashboard/dashboard.scss";
import "../menu.scss";

const data2 = [
    {
        name: "Traffic fines",
        success: 10,
        failure: 62
    },
    {
        name: "Mutuelles",
        success: 20,
        failure: 3834
    }
];

class SuccessRate extends Component {
    state = { data: [] };

    static getDerivedStateFromProps(props) {
        const data = props && props.listOfServiceDistribution;
        return { data };
    }

    render() {
        const { data } = this.state;

        for (let i = 0; i < data.length; i++) {
            delete data[i].count;
        }

        console.log("DATA FILTERED ===>>", data);
        return (
            <div className="dashboard">
                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "99%" }}>
                    <div></div>
                    <div>
                        <p className="sales-text">Success and Failure Rates</p>
                        <ResponsiveContainer width="100%" height={300}>
                            {data.length > 0 ? (
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }}>
                                    <CartesianGrid
                                        vertical={false}
                                        horizontal
                                        strokeDasharray="2 2"
                                    />
                                    <XAxis
                                        tick={{
                                            fill: "rgba(47, 63, 82, 0.5)",
                                            fontSize: 15
                                        }}
                                        stroke="#bdbdbd"
                                        dataKey="name"
                                    />
                                    <YAxis stroke="#bdbdbd" />
                                    <Tooltip cursor={{ fill: "#f5f5f5" }} />
                                    <Legend />
                                    <Bar dataKey="failure" stackId="a" fill="#f44336" />
                                    <Bar dataKey="success" stackId="a" fill="#82ca9d" />
                                </BarChart>
                            ) : (
                                <div>
                                    <Spin tip="Loading...">
                                        <div
                                            style={{
                                                marginRight: "35px"
                                            }}>
                                            <BarChart
                                                className="bar-stack"
                                                width={1200}
                                                height={300}
                                                data={data2}>
                                                <CartesianGrid
                                                    vertical={false}
                                                    horizontal
                                                    strokeDasharray="2 2"
                                                />
                                                <XAxis
                                                    tick={{
                                                        fill: "rgba(47, 63, 82, 0.5)",
                                                        fontSize: 15
                                                    }}
                                                    stroke="#bdbdbd"
                                                    dataKey="name"
                                                />
                                                <YAxis stroke="#bdbdbd" />
                                                <Tooltip cursor={{ fill: "#f5f5f5" }} />
                                                <Legend />
                                                <Bar
                                                    dataKey="failure"
                                                    stackId="a"
                                                    fill="#f44336"
                                                />
                                                <Bar
                                                    dataKey="success"
                                                    stackId="a"
                                                    fill="#82ca9d"
                                                />
                                            </BarChart>
                                        </div>
                                    </Spin>
                                </div>
                            )}
                        </ResponsiveContainer>
                    </div>
                </CustomCard>
            </div>
        );
    }
}

SuccessRate.propTypes = { listOfServiceDistribution: PropTypes.array };

const mapStateToProps = ({ ussd: { listOfServiceDistribution } }) => ({
    listOfServiceDistribution
});

export default connect(mapStateToProps, null)(SuccessRate);
