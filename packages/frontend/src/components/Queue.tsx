import { Button, Form, Input } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "state";

import { alterCurrentQueue, QueueAction } from "../state/thunks/alterCurrentQueue";
import { useThunkDispatch } from "../useThunkDispatch";
import { CurrentLoadChart } from "./CurrentLoadChart";

export const Queue = () => {
    const dispatch = useThunkDispatch();
    const travelTime = useSelector((state: State) => state.app.travelTime);
    const availableTime = useSelector((state: State) => state.app.availableTime);
    // const counter = useSelector((state: State) => state.example.counter);

    return (
        <>
            <header>
                <div className="space"></div>
                <h1>Anstehen</h1>
                <div className="space"></div>
            </header>
            <main>
                <Form>
                    <Form.Item label={"Ich bin verfügbar ab"}>
                        {/* <TimePicker value={time} onChange={(e) => setTime(e.target.value)} /> */}
                    </Form.Item>
                    <Form.Item label={"Dauer Anreise"}>
                        <Input disabled type="number" value={travelTime} />
                    </Form.Item>
                </Form>
                Todo: Grafik Bitte losgehen in:
                <Button onClick={() => dispatch(alterCurrentQueue(QueueAction.ARRIVED))}>Ich bin angekommen</Button>
                <CurrentLoadChart />
                <Button onClick={() => dispatch(alterCurrentQueue(QueueAction.CANCEL))}>Abbrechen</Button>
            </main>
        </>
    );
};
