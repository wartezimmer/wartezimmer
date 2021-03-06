import { MenuOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React from "react";
import { AppApi } from "state/app";
import { useThunkDispatch } from "useThunkDispatch";

const { Header } = Layout;

export const NavBar = () => {
    const dispatch = useThunkDispatch();

    return (
        <Header>
            <img
                src="/images/logo.png"
                alt="WirVsVirus Projekt"
                style={{ height: "2.5rem" }}
            />
            <Button
                ghost
                onClick={() => {
                    dispatch(AppApi.toggleSideBar());
                }}
            >
                <MenuOutlined />
            </Button>
        </Header>
    );
};
