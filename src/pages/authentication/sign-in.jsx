import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import { Form } from "antd";

import SideBlueDiv from "../../components/common/authentication/sideBlueDiv";
import CustomButton from "../../components/common/button/button";

import { signInWithGoogle } from "../../firebase/firebase.utils";

import COMPUTERLOGO from "../../assets/google.svg";
import "./authentication.scss";

class Signin extends PureComponent {
    state = {
        loading: false
    };

    handleClick = () => {
        this.setState({
            loading: true
        });
        signInWithGoogle();
    };
    render() {
        const { currentUser } = this.props;
        const { loading } = this.state;
        return (
            <div className="authentication">
                {currentUser ? <Redirect to="/dashboard" /> : <Redirect to="/" />}
                <Row>
                    <Col span={8}>
                        <SideBlueDiv />
                    </Col>
                    <Col span={16}>
                        <Row>
                            <Col span={8} offset={8}>
                                <div className="sign-container">
                                    <Form
                                        name="basic"
                                        initialValues={{
                                            remember: true
                                        }}>
                                        <Form.Item>
                                            <CustomButton
                                                onClick={this.handleClick}
                                                className="width-btn-login">
                                                <img
                                                    className=""
                                                    src={COMPUTERLOGO}
                                                    alt="logo"
                                                />
                                                <span className="test-login-signin">
                                                    SIGN IN WITH IREMBO ACCOUNT
                                                </span>
                                                {loading ? <Spin size="large" /> : ""}
                                            </CustomButton>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export const mapStateToProps = ({ user: { currentUser, loading } }) => ({
    currentUser,
    loading
});

export default connect(mapStateToProps, null)(Signin);
