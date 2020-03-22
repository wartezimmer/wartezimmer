import { Button, Form, Input, TimePicker } from "antd";
import React from "react";
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
                <div className="space"></div>
                <h1>Anstellen</h1>
                <div className="space"></div>
            </header>
            <main id="enqueue">
                <div className="info">
                    <img src="/images/logo.svg" alt=""/>
                    <div className="doc-name">{facility.name}</div>
                    <div className="doc-address">{facility.street}</div>
                </div>
                <CurrentLoadChart />
                
                <Form>
                    <div className="label">Ich bin Verfügbar ab:</div>
                    <Form.Item>
                        <TimePicker />
                    </Form.Item>
                    <div className="label">Dauer meiner Anreise:</div>
                    <Form.Item>
                        <Input className ="duration-input"
                            type="number"
                            value={travelTime}
                            onChange={(e) => dispatch(AppApi.setTravelTime(+e.target.value))}
                            />
                    </Form.Item>
                    
                    <div className="bottom actions">
                        <Button className="border-blue" onClick={() => dispatch(AppApi.back())}>Zurück</Button>
                        <Button className="primary-red" onClick={() => dispatch(enqueue())}>Einreihen</Button>
                    </div>
                </Form>
            </main>
        </>
    );
};
