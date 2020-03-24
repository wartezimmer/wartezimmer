import { Button, Input } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "state";
import { alterCurrentQueue, QueueAction } from "state/thunks/alterCurrentQueue";
import { cancel } from "../state/thunks/cancel";

import { useThunkDispatch } from "../useThunkDispatch";

export const Wait = () => {
    const dispatch = useThunkDispatch();    
    const facility = useSelector((state: State) => state.app.currentFacility!);

    const currentWaitTime = useSelector((state: State) => state.app.currentWaitTime);
    const [peopleInQueue, setPeopleInQueue] = useState(0);
    return (
        <>
            <header>
                <div></div>
                <h1>Wartezimmer</h1>
                <div></div>
            </header>
            <main id="wait">
                <div className="doc-info">
                    <div className="doc-name">{facility.name}</div>
                    <div className="doc-address">{facility.address_street}</div>
                </div>
                <div className="waiting-info">
                    <div className="info">Aktuelle Wartezeit:</div>
                    <div className="image">Grafik</div>
                    <div className="time">0h 5m</div>
                </div>
                <div className="people-text">Wie viele leute warten jetzt gerade?</div>
                <Input className="people-input" value={peopleInQueue} onChange={(e) => setPeopleInQueue(+e.target.value)} />
                <div className="bottom actions">
                    <Button className="border-blue" onClick={() => dispatch(cancel())}>Abbrechen</Button>
                    <Button className="primary-red" onClick={() => dispatch(alterCurrentQueue(QueueAction.START_TREATMENT))}>Ich bin dran</Button>
                </div>
            </main>
        </>
    );
};
