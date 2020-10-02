import React, { Component } from "react";
import { Row, Col } from "antd";
import Sidebar from "../../components/common/sidebar/sidebar";
import Navbar from "../../components/common/header/header";
import AnalyticsView from "../../components/dashboard/analytics";

import "./analytics.scss";

class Analytics extends Component {
    render() {
        return (
            <div className="dashboard">
                <Navbar title="Dashboard USSD" />
                <div className="bg-color">
                    <Sidebar />
                    <Row>
                        <Col span={2} />
                        <Col span={22}>
                            <div style={{ marginLeft: "65px" }}>
                                <AnalyticsView />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="profile-container"></div>
            </div>
        );
    }
}

export default Analytics;
