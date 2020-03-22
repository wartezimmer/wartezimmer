import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi, Step } from "../state/app";
import { enqueue } from "../state/thunks/enqueue";
import { useThunkDispatch } from "../useThunkDispatch";
import { alterCurrentQueue, QueueAction } from "state/thunks/alterCurrentQueue";

export const Facility = () => {
    const dispatch = useThunkDispatch();
    const facility = useSelector((state: State) => state.app.currentFacility!);
    const travelTime = useSelector((state: State) => state.app.travelTime);
    const currentFacility = useSelector((state: State) => state.app.currentFacility);
    // const counter = useSelector((state: State) => state.example.counter);

    return (
        <>
            <main id="facility">
                <div className="doc-info">
                    {/* <div className="doc-type">Praxis</div> */}
                    <div className="doc-name">{facility.name}</div>
                    <div className="doc-address">{facility.street}</div>
                    <div className="doc-phone">
                        <img src="/images/phone.svg" alt=""/>
                        <span>{facility.phone}</span>
                    </div>
                </div>
                <div>
                    <div className="open">Heute geöffnet von:</div>
                    <div className="open-time">8 bis 16 Uhr</div>
                </div>
                <div>
                    <div className="load">Aktuelle Auslastung</div>
                    <div className="load-value">Gering</div>
                </div>
                <div className="chart">
                    <div>Chart</div>
                </div>
                <div>
                    <div className="waitingtime-title">Vorraussichtliche Wartezeit:</div>
                    <div className="waitingtime">1 STD 45 MIN</div>
                </div>
                <div className="bottom actions">
                    <Button className="border-blue" onClick={() => dispatch(AppApi.back())}>Zurück</Button>
                    <Button className="primary-red" onClick={() => dispatch(AppApi.gotoStep(Step.Enqueue))}>Anstellen</Button>
                </div>
            </main>
        </>
    );
};
