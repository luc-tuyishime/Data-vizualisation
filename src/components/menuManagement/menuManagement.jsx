import React, { Component } from "react";
import { Row, Col } from "antd";
import CustomCard from "../card/card";

import ServiceDistribution from "./usedService/serviceDistributionChart";
// import AreaChartLeft from "./ussdPerformance/ussdPerformanceChart";
import SuccessRate from "./successRate/successRate";
import Grid from "./draggableMenu/menu";

import "./menu.scss";

class MenuManagement extends Component {
    render() {
        return (
            <div className="menu-manaagement">
                <p className="text-service">Most Used Services</p>
                <Row>
                    <Col span={12}>
                        <CustomCard className="card-style1" style={{ width: "98%" }}>
                            <Grid />
                        </CustomCard>
                    </Col>
                    <Col span={12}>
                        <CustomCard className="card-style1" style={{ width: "98%" }}>
                            <ServiceDistribution />
                        </CustomCard>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <SuccessRate />
                    </Col>
                </Row>
                <Row>
                    {/* <Col span={24}>
                        <AreaChartLeft />
                    </Col> */}
                </Row>
            </div>
        );
    }
}

export default MenuManagement;
