import { Button, Input } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "state";
import { alterCurrentQueue, QueueAction } from "state/thunks/alterCurrentQueue";

import { useThunkDispatch } from "../useThunkDispatch";

export const Wait = () => {
    const dispatch = useThunkDispatch();
    const currentWaitTime = useSelector((state: State) => state.app.currentWaitTime);
    const [peopleInQueue, setPeopleInQueue] = useState(0);
    return (
        <>
            <header>
                <div></div>
                <h1>Wartezimmer</h1>
                <div></div>
            </header>
            <main>
                <div className="waiting-info">
                    <div className="info">Aktuelle Wartezeit:</div>
                    <div className="image">Grafik</div>
                    <div className="time">0h 5m</div>
                </div>
                <div className="people-text">Wie viele leute warten jetzt gerade?</div>
                <Input className="people-info" value={peopleInQueue} onChange={(e) => setPeopleInQueue(+e.target.value)} />
                <div className="bottom actions">
                    <Button className="border-blue" onClick={() => dispatch(alterCurrentQueue(QueueAction.CANCEL))}>Abbrechen</Button>
                    <Button className="primary-red" onClick={() => dispatch(alterCurrentQueue(QueueAction.START_TREATMENT))}>Ich bin dran</Button>
                </div>
            </main>
        </>
    );
};
