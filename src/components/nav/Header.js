import { useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <SubMenu icon={<SettingOutlined />} title="Username">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="login" icon={<UserOutlined />} className="float-end">
          Login
        </Menu.Item>
        <Menu.Item key="register" icon={<UserAddOutlined />}>
          Register
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Header;
