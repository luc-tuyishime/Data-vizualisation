import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './sidebar.scss';

import LOGO from '../../../assets/whiteLogo.png';
import HOMELOGO from '../../../assets/dashboard.svg';
import SETTINGSLOGO from '../../../assets/settings.svg';
import COMPUTERLOGO from '../../../assets/computer.svg';

const { Sider } = Layout;

class Sidebar extends Component {
    state = { openKeys: [] };

    static propTypes = { location: PropTypes.object.isRequired };

    render() {
      const { location } = this.props;

      return (
            <div className="slider">
                <Sider
                    width={180}
                    className="sider-class"
                    style={{
                      height: '100vh',
                      position: 'fixed',
                      zIndex: 1
                    }}>
                    <div>
                        <img src={LOGO} alt="logo" className="logo-sidebar" />
                    </div>
                    <Menu
                        className="menu-icons"
                        mode="inline"
                        defaultSelectedKeys={['/dashboard']}
                        selectedKeys={[location.pathname]}>
                        <Menu.Item key="/dashboard" className="text-side">
                            <img className="img-logo" src={HOMELOGO} alt="logo" />
                            <Link to="/dashboard">
                                <span className="text-sider">Dashboard</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/menu-management" className="text-side">
                            <img className="img-logo" src={COMPUTERLOGO} alt="logo" />
                            <Link to="/menu-management">
                                <span className="text-sider">USSD Menu</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/guide" className="text-side">
                            <img className="img-logo" src={SETTINGSLOGO} alt="logo" />
                            <Link to="/guide">
                                <span className="text-sider">Users Guide</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
      );
    }
}

export default withRouter(Sidebar);
