import React, { Component } from "react";
import { Row, Col } from "antd";
import Sidebar from "../../components/common/sidebar/sidebar";
import Navbar from "../../components/common/header/header";
import MenuManagement from "../../components/menuManagement/menuManagement";

import "./menuManagement.scss";

class menuManagement extends Component {
    render() {
        return (
            <div className="dashboard">
                <Navbar title="USSD Menu Management" />
                <div className="bg-color">
                    <Sidebar />
                    <Row>
                        <Col span={2} />
                        <Col span={22}>
                            <div style={{ marginLeft: "65px" }}>
                                <MenuManagement />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="profile-container"></div>
            </div>
        );
    }
}

export default menuManagement;
