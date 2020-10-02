import React from "react";
import { Dropdown, Menu, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1" icon={<UserOutlined />}>
            1st menu item
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
            2nd menu item
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
            3rd item
        </Menu.Item>
    </Menu>
);

const DropdownMenu = ({ children }) => (
    <div>
        <Dropdown overlay={menu}>{children}</Dropdown>
    </div>
);

export default DropdownMenu;
