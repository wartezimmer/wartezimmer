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
    const facility = useSelector((state: State) => state.app.currentFacility!);

    // const counter = useSelector((state: State) => state.example.counter);

    return (
        <>
            <header>
                <div className="space"></div>
                <h1>Warten</h1>
                <div className="space"></div>
            </header>
            <main id="queue">
                <div className="doc-info">
                    <div className="doc-name">{facility.name}</div>
                    <div className="doc-address">{facility.address_street}</div>
                </div>
                <div className="user-input">
                    <div className="item">
                        <div className="key">Ich bin verfügbar ab</div>
                        <div className="value">{availableTime} UHR</div>
                    </div>
                    <div className="item">
                        <div className="key">Dauer meiner Anreise</div>
                        <div className="value">{travelTime} MIN</div>
                    </div>
                </div>
                <div className="waiting-info">
                    <div className="info">Bitte aufbrechen in:</div>
                    <div className="image">Grafik</div>
                    <div className="time">0h 45m</div>
                </div>
                <CurrentLoadChart />
                <div className="bottom actions">
                    <Button className="border-blue" onClick={() => dispatch(alterCurrentQueue(QueueAction.CANCEL))}>Abbrechen</Button>
                    <Button className="primary-red" onClick={() => dispatch(alterCurrentQueue(QueueAction.ARRIVED))}>angekommen</Button>
                </div>
            </main>
        </>
    );
};
