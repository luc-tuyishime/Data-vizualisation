import React, { Component } from 'react';
import { Layout, Row, Col, Avatar, Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DownOutlined } from '@ant-design/icons';
import { auth } from '../../../firebase/firebase.utils';
import './header.scss';

const { Header } = Layout;

const menu = (
    <Menu>
        <Menu.Item onClick={() => auth.signOut()} style={{ padding: '14px' }}>
            Logout
        </Menu.Item>
    </Menu>
);

class Navbar extends Component {
  render() {
    const { title, currentUser } = this.props;
    return (
            <div className="header">
                <Header style={{ padding: 0, backgroundColor: '#fff' }}>
                    <Row>
                        <Col span={3} />
                        <Col span={8}>
                            <p className="header-text">{title}</p>
                        </Col>
                        <Col span={5} offset={8}>
                            <div className="profile-float">
                                <Avatar size={35} src={currentUser.photoURL} />
                                <Dropdown overlay={menu}>
                                    <button
                                        className="profile-container"
                                        onClick={(e) => e.preventDefault()}>
                                        <span className="profile_name">
                                            {currentUser.displayName}
                                        </span>{' '}
                                        <DownOutlined className="outline-color" />
                                    </button>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Header>
            </div>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string,
  currentUser: PropTypes.object
};

export const mapStateToProps = ({ user: { currentUser } }) => ({ currentUser });

export default connect(mapStateToProps, null)(Navbar);
