import React, { Component } from "react";
import { Row, Col } from "antd";
import Sidebar from "../../components/common/sidebar/sidebar";
import Navbar from "../../components/common/header/header";
import Guide from "../../components/userGuide/guide";

import "./profile.scss";

class GuideContainer extends Component {
    render() {
        return (
            <div className="dashboard">
                <Navbar title="User guide" />
                <div className="bg-color">
                    <Sidebar />
                    <Row>
                        <Col span={2} />
                        <Col span={22}>
                            <div style={{ marginLeft: "65px" }}>
                                <Guide />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="profile-container"></div>
            </div>
        );
    }
}

export default GuideContainer;
