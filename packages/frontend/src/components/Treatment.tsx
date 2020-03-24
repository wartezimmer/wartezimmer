import { Button } from "antd";
import React, { useState } from "react";

import { alterCurrentQueue, QueueAction } from "../state/thunks/alterCurrentQueue";
import { useThunkDispatch } from "../useThunkDispatch";
import { State } from "state";
import { useSelector } from "react-redux";

export const Treatment = () => {
    const dispatch = useThunkDispatch();
    
    // const counter = useSelector((state: State) => state.example.counter);
    const facility = useSelector((state: State) => state.app.currentFacility!);
    const [peopleBeforeMe, setPeopleBeforeMe] = useState(0);

    return (
        <>
            <header>
                <div></div>
                <h1>Behandlungsraum</h1>
                <div></div>
            </header>
            <main id="treatment">
                <div className="doc-info">
                    <div className="doc-name">{facility.name}</div>
                    <div className="doc-address">{facility.address_street}</div>
                </div>
                <div className="waiting-info">
                    <div className="info">In Behandlung seit:</div>
                    <div className="image">Grafik</div>
                    <div className="time">0h 5m</div>
                </div>
                <div className="bottom actions">
                    <div></div>
                    <Button className="primary-red" onClick={() => dispatch(alterCurrentQueue(QueueAction.STOP_TREATMENT))}>
                        Behandlung beendet
                    </Button>

                </div>
            </main>
        </>
    );
};
