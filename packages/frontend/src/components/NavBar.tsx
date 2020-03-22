import { MenuOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "state";
import { AppApi } from "state/app";

import { useThunkDispatch } from "../useThunkDispatch";

const { Header } = Layout;

export const NavBar = () => {
    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);
    const collapsed = useSelector((state: State) => state.app.collapseSideBar);

    return (
        <Header>
            <img
                src="/images/Logo_Projekt_01_weiss.svg"
                alt="WirVsVirus Projekt"
                style={{ height: "3rem" }}
            />
            <Button
                ghost
                onClick={() => {
                    // AppApi.toggleSideBar();
                    AppApi.setSideBarCollapsed(!collapsed);
                    console.log("toggle", collapsed);
                }}
            >
                <MenuOutlined />
            </Button>
        </Header>
    );
};
