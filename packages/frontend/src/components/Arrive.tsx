import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { ExampleApi } from "state/example";

import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export const Arrive = () => {
    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);
    return (
        <>
            <header>
                <LeftOutlined onClick={() => dispatch(AppApi.back())} />
                <h1>Account Anlegen</h1>
                <div className="space"></div>
            </header>
            <main>
                <Button onClick={() => dispatch(ExampleApi.increment())}>MEHR INFOS</Button>
                <Button onClick={() => dispatch(ExampleApi.reset())}>ANMELDUNG</Button>
            </main>
        </>
    );
};
