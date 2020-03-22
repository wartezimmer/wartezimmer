import { LeftOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi } from "../state/app";
import { enqueue } from "../state/thunks/enqueue";
import { useThunkDispatch } from "../useThunkDispatch";
import { CurrentLoadChart } from "./CurrentLoadChart";

export const Enqueue = () => {
    const dispatch = useThunkDispatch();
    const facility = useSelector((state: State) => state.app.currentFacility!);
    const travelTime = useSelector((state: State) => state.app.travelTime);
    // const counter = useSelector((state: State) => state.example.counter);

    return (
        <>
            <header>
                <LeftOutlined onClick={() => dispatch(AppApi.back())} />
                <h1>Account Anlegen</h1>
                <div className="space"></div>
            </header>
            <main>
                <Form>
                    <Form.Item label={"Ich bin Verfügbar ab"}>
                        {/* <TimePicker value={time} onChange={(e) => setTime(e.target.value)} /> */}
                    </Form.Item>
                    <Form.Item label={"Dauer Anreise"}>
                        <Input
                            type="number"
                            value={travelTime}
                            onChange={(e) => dispatch(AppApi.setTravelTime(+e.target.value))}
                        />
                    </Form.Item>
                    {/* <Button onClick={() => dispatch(AppApi.back())}>Zurück</Button> */}
                    {facility ? facility.name : "kann später nicht mehr passieren"}
                    <Button onClick={() => dispatch(enqueue())}>Anstellen</Button>
                </Form>
                    <CurrentLoadChart />
            </main>
        </>
    );
};
