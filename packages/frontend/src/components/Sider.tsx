import { CloseOutlined, InfoCircleOutlined, PushpinOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Layout, Menu, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "state";
import { AppApi, Step } from "state/app";
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
            style={{
                right: 0,
                position: "absolute",
                overflow: "hidden",
                whiteSpace: "nowrap",
            }}
        >
            <div className="user">
                <Row>
                    <Col className="text-right">
                        <Button ghost onClick={() => dispatch(AppApi.setSideBarCollapsed(true))}>
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
            </div>
            <Menu
                mode="inline"
                selectable={false}
                inlineCollapsed={collapseSideBar}
            >
                <Menu.Divider />
                <Menu.Item onClick={() => {
                    dispatch(AppApi.gotoStep(Step.Search));
                    dispatch(AppApi.setSideBarCollapsed(true));
                }}>
                    <PushpinOutlined />
                    <span>Karte</span>
                </Menu.Item>
                <Menu.Item onClick={() => {
                    dispatch(AppApi.gotoStep(Step.About));
                    dispatch(AppApi.setSideBarCollapsed(true));
                }}>
                    <InfoCircleOutlined />
                    <span>So funktionierts</span>
                </Menu.Item>
                {/* <Menu.Item     todo: temporarely removed for mvp
                    style={{
                        marginBottom: "50px",
                    }}
                    onClick={() => {
                        dispatch(signout());
                        dispatch(AppApi.setSideBarCollapsed(true));
                    }}
                >
                    <LogoutOutlined />
                    <span>Abmelden</span>
                </Menu.Item> */}
                <div className="grow"></div>
                <Menu.Divider />
                <div className="sider-banner">
                    <img className="logo" src="/images/logo.svg" alt="" />
                    <div className="light">Die</div>
                    <h1>
                        WARTE-
                        <br />
                        SCHLEIFE
                    </h1>
                    <h2>Warten im Wohnzimmer</h2>
                    {/* <div className="text-right"> */}
                    <img
                        className="proj"
                        src="/images/Logo_Projekt_02.svg"
                        alt=""
                        style={{
                            height: "3rem",
                        }}
                    />
                    {/* </div> */}
                </div>
                <Menu.Item className="text-center impressum-btn" onClick={() => {
                    dispatch(AppApi.gotoStep(Step.Imprint));
                    dispatch(AppApi.setSideBarCollapsed(true));
                }}>
                    Impressum
                </Menu.Item>

            </Menu>
        </Layout.Sider>
    );
};
