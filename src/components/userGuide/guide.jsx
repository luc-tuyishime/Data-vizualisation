import React, { Component } from "react";
import CustomCard from "../card/card";
import { Row, Col } from "antd";

import SETTINGLOGO from "../../assets/guide.svg";

import "../../pages/authentication/authentication.scss";
import "./profile.scss";

class Guide extends Component {
    render() {
        return (
            <div className="authentication">
                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "98%" }}>
                    <div>
                        <Row>
                            <Col span={1}>
                                <div className="bg-rounded-profile">
                                    <img className="" src={SETTINGLOGO} alt="logo" />
                                </div>
                            </Col>
                            <Col span={19}>
                                <div className="password-container">
                                    <p className="profile-text-setting">
                                        Which data am I seeing on the Dashboard?
                                    </p>
                                    <p>
                                        On the dashboard, you will be able to see the
                                        following metrics:
                                    </p>
                                    <p>
                                        -{" "}
                                        <span className="profile-text-subtext">
                                            Requests
                                        </span>
                                        : Those are the number of requests sent to the
                                        USSD app. It allows you to analyze peak times and
                                        usage of your application.
                                    </p>
                                    <p>
                                        -{" "}
                                        <span className="profile-text-subtext">
                                            Latency
                                        </span>
                                        : This is the response time to the server.
                                    </p>
                                    <p>
                                        -{" "}
                                        <span className="profile-text-subtext">
                                            CPU & Memory Usage
                                        </span>
                                        : This is the real-time consumption of the
                                        physical resources on your servers.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </CustomCard>

                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "98%" }}>
                    <div>
                        <Row>
                            <Col span={1}>
                                <div className="bg-rounded-profile">
                                    <img className="" src={SETTINGLOGO} alt="logo" />
                                </div>
                            </Col>
                            <Col span={19}>
                                <div className="password-container">
                                    <p className="profile-text-setting">
                                        Which data am I seeing on the USSD analytics?
                                    </p>
                                    <p>
                                        On the USSD analytics, you will be able to analyze
                                        the number of users that used your app, as well as
                                        the average session duration and the bounce rate
                                        (=number of people who entered the USSD
                                        application and left without taking an action).
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </CustomCard>

                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "98%" }}>
                    <div>
                        <Row>
                            <Col span={1}>
                                <div className="bg-rounded-profile">
                                    <img className="" src={SETTINGLOGO} alt="logo" />
                                </div>
                            </Col>
                            <Col span={19}>
                                <div className="password-container">
                                    <p className="profile-text-setting">
                                        How can I use the USSD menu management tool?
                                    </p>
                                    <p>
                                        As part of our project, we availed for you the
                                        ability to change the order of the{" "}
                                        <span className="profile-text-subtext">
                                            primary USSD menu only.
                                        </span>{" "}
                                        By simply dragging and dropping, you are able to
                                        rearrange the order of items in the menu. We also
                                        availed a graph with the most used services, so
                                        that it can give you insights on what to
                                        prioritize.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </CustomCard>

                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "98%" }}>
                    <div>
                        <Row>
                            <Col span={1}>
                                <div className="bg-rounded-profile">
                                    <img className="" src={SETTINGLOGO} alt="logo" />
                                </div>
                            </Col>
                            <Col span={19}>
                                <div className="password-container">
                                    <p className="profile-text-setting">
                                        How can I add, remove or change users’ accesses to
                                        the web portal?
                                    </p>
                                    <p>
                                        As requested, all user authentications features
                                        are done through Google API. As part of the code
                                        package, you received access to Firebase, which is
                                        the tool used for signup and signin through
                                        Google. You can add or remove users from there
                                        (initially, we added the email adresses you
                                        provided).
                                    </p>
                                    <p>
                                        Note that all tasks related to changing email,
                                        change password, or reset password, should be done
                                        through Google only.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </CustomCard>
            </div>
        );
    }
}

export default Guide;
