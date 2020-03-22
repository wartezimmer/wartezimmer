import { CloseOutlined, InfoCircleOutlined, LogoutOutlined, PushpinOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Layout, Menu, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "state";
import { AppApi } from "state/app";
import { useThunkDispatch } from "useThunkDispatch";

export const Sider = () => {
    const dispatch = useThunkDispatch();
    const collapseSideBar = useSelector((state: State) => state.app.collapseSideBar);

    return (
        <Layout.Sider
            collapsible
            width="300"
            collapsedWidth="0"
            collapsed={collapseSideBar}
            trigger={null}
            className="uppercase"
        >
            <Row>
                <Col className="text-right">
                    <Button
                        ghost
                        onClick={() => dispatch(AppApi.setSideBarCollapsed(true))}
                    >
                        <CloseOutlined />
                    </Button>
                </Col>
            </Row>
            <Row className="text-center my-2">
                <Col>
                    <Avatar size={64} icon={<UserOutlined />} />
                </Col>
            </Row>
            <Row className="text-center my-2">
                <Col>Max Mustermann</Col>
            </Row>
            <Row className="text-center my-2">
                <Col>email@example.com</Col>
            </Row>
            <Menu
                mode="inline"
                inlineCollapsed={collapseSideBar}
            >
                <Menu.Divider />
                <Menu.Item key="1">
                    <PushpinOutlined />
                    <span>Karte</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <InfoCircleOutlined />
                    <span>So funktionierts</span>
                </Menu.Item>
                <Menu.Item key="3" style={{
                    paddingBottom: "75px",
                }}>
                    <LogoutOutlined />
                    <span>Abmelden</span>
                </Menu.Item>
                <Menu.Divider />
                <div className="sider-banner">
                    <img className="logo" src="/images/logo.svg" alt="" />
                    <div className="light">Die</div>
                    <h1>WARTE-<br />SCHLEIFE</h1>
                    <h2>Warten im Wohnzimmer</h2>
                    <div className="text-right">
                        <img className="mt-5" src="/images/Logo_Projekt_02.svg" alt="" style={{
                            height: "3rem",
                        }} />
                    </div>
                </div>
                <Menu.Item key="4" className="text-center impressum-btn">
                    Impressum
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};
