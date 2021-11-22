import React from "react";
import { Layout, Menu, Col } from "antd";
import { useHistory } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import * as api from "../services/login";
const { Header } = Layout;

const HeaderComponent = () => {
    const history = useHistory();
    let location = useLocation();
    const pathName = location.pathname;
    const infoUser = api.decodeTokenFormLocalStorage();

    const logout = () => {
        if (infoUser !== null) {
            api.removeTokenLocalStorage();
            history.push("/login");
        }
    };

    return (
        <Header>
            <NavLink to="/home">
                <div className="logo">
                    <span>Phimmoi.net</span>
                </div>
            </NavLink>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={pathName}>
                <Menu.Item key="/home">
                    <NavLink to="/home">Trang chủ</NavLink>
                </Menu.Item>
                <Menu.Item key="/up-coming">
                    <NavLink to="/up-coming">Phim sắp công chiếu</NavLink>
                </Menu.Item>
                <Menu.Item key="/search">
                    <NavLink to="/search">Tìm kiếm phim</NavLink>
                </Menu.Item>
                {!infoUser && (
                    <Menu.Item key="/login">
                        <NavLink to="/login">Đăng nhập</NavLink>
                    </Menu.Item>
                )}
                {infoUser && (
                    <Menu.Item>
                        <strong>{`Hi: ${infoUser.username}`}</strong>
                    </Menu.Item>
                )}
                {infoUser && (
                    <Menu.Item>
                        <span onClick={() => logout()}>Logout</span>
                    </Menu.Item>
                )}
            </Menu>
        </Header>
    );
};

export default React.memo(HeaderComponent);
