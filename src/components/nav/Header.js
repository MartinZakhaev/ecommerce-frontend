import { useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link style={{ textDecoration: "none" }} to="/">
          Home
        </Link>
      </Item>
      {!user ? (
        <>
          <Item
            style={{ marginLeft: "auto" }}
            key="login"
            icon={<UserOutlined />}
          >
            <Link style={{ textDecoration: "none" }} to="/login">
              Login
            </Link>
          </Item>
          <Item key="register" icon={<UserAddOutlined />}>
            <Link style={{ textDecoration: "none" }} to="/register">
              Register
            </Link>
          </Item>
        </>
      ) : (
        <SubMenu
          style={{ marginLeft: "auto" }}
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Log out
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
