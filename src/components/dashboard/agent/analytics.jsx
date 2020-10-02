import React, { Component } from "react";
import { Row, Col, Select, Layout } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CardLeft from "./smallCards/cardLeft";
import moment from "moment";
import CardCenter from "./smallCards/cardCenter";
import CardRight from "./smallCards/cardRight";
import {
    getRateAgent,
    durationAgent,
    getStartTime,
    getUptime,
    heapUsage,
    nonHeapUsage
} from "../../../redux/actions/USSD";
import { SelectOption } from "../exportSelect";
import { options } from "../../../helpers";
import CardRightLast from "./smallCards/cardRightLast";
import USSDAreaChartLeft from "./ussdChart/RatesChart";
import USSDAreaChartCenter from "./ussdChart/ErrorsChart";
import { customStyles } from "../../../helpers/getDifferentTime";

import "./analytics.scss";
import USSDAreaChartRight from "./ussdChart/durationChart";

const { Option } = Select;

const { Sider, Content } = Layout;

function handleChange(value) {
    console.log(`selected ${value}`);
}

class AnalyticsView extends Component {
    state = {
        selectedOption: ""
    };

    handleChange = (selectedOption) => {
        const { getRateAgent, durationAgent } = this.props;
        this.setState({ selectedOption });

        if (selectedOption) {
            const { value, label } = selectedOption;
            const { startDate, endDate } = value;

            if (label.includes("Last 24 hour")) {
                getRateAgent(startDate, moment().unix(), false);
                durationAgent(startDate, moment().unix(), false);
            } else {
                getRateAgent(startDate, endDate, true);
                durationAgent(startDate, endDate, true);
            }
        }
    };

    render() {
        const { selectedOption } = this.state;
        return (
            <div className="dashboard-main-container">
                <Layout>
                    <Layout style={{ width: "99%", backgroundColor: "#fafafa" }}>
                        <Content style={{ backgroundColor: "#fafafa" }}>
                            <Row className="select-draw-padding">
                                <Col className="calendar-position" span={18} push={6}>
                                    {" "}
                                </Col>

                                <Col span={6} pull={18}>
                                    <div className="container">
                                        <div className="box1">
                                            <div className="application-border">
                                                <p>Applications</p>
                                            </div>
                                        </div>
                                        <div className="box2">
                                            <Select
                                                className="select-style"
                                                defaultValue="lucy"
                                                style={{ width: 220 }}
                                                onChange={handleChange}>
                                                <Option value="lucy">
                                                    <Link to="/dashboard">
                                                        irembo-ussd-app
                                                    </Link>
                                                </Option>
                                                <Option value="jack">
                                                    <Link to="/agent">
                                                        irembo-ussd-agent
                                                    </Link>
                                                </Option>
                                            </Select>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Content>
                        <Sider style={{ backgroundColor: "#fafafa" }}>
                            <div className="calendar-position">
                                <div className="search-width">
                                    <SelectOption
                                        value={selectedOption}
                                        onChange={this.handleChange}
                                        options={options}
                                        styles={customStyles}
                                        placeholder="Today"
                                    />
                                </div>
                            </div>
                        </Sider>
                    </Layout>
                </Layout>

                <Row>
                    <Col span={6}>
                        <CardLeft handleChange={this.handleChange} />
                    </Col>
                    <Col span={6}>
                        <CardCenter handleChange={this.handleChange} />
                    </Col>
                    <Col span={6}>
                        <CardRight handleChange={this.handleChange} />
                    </Col>
                    <Col span={6}>
                        <CardRightLast handleChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <USSDAreaChartLeft
                            handleChange={this.handleChange}
                            selectedOption={selectedOption}
                        />
                    </Col>
                    <Col span={12}>
                        <USSDAreaChartCenter />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <USSDAreaChartRight
                            handleChange={this.handleChange}
                            selectedOption={selectedOption}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(null, {
    getRateAgent,
    durationAgent,
    getStartTime,
    getUptime,
    heapUsage,
    nonHeapUsage
})(AnalyticsView);
