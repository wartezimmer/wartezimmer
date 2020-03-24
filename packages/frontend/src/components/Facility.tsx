import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi, Step } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { fetchEngagement } from "state/thunks/fetchEngagement";

export const Facility = () => {
    const dispatch = useThunkDispatch();
    const facility = useSelector((state: State) => state.app.currentFacility!);
    const travelTime = useSelector((state: State) => state.app.travelTime);
    const currentUserId = useSelector((state: State) => state.app.currentUserId);
    // const counter = useSelector((state: State) => state.example.counter);

    return (
        <>
            <main id="facility">
                <div className="doc-info">
                    {/* <div className="doc-type">Praxis</div> */}
                    <div className="doc-name">{facility.name}</div>
                    <div className="doc-address">{facility.address_street}</div>
                    <div className="doc-phone">
                        <img src="/images/phone.svg" alt=""/>
                        <span>{facility.contact_phone}</span>
                    </div>
                </div>
                <div>
                    <div className="open">Heute geöffnet von:</div>
                    <div className="open-time">8 bis 16 Uhr</div>
                </div>
                <div>
                    <div className="load-key">Aktuelle Auslastung:</div>
                    <div className="load-value">Gering</div>
                </div>
                <div className="chart">
                    <img src="/images/auslastung.svg" alt=""/>
                </div>
                <div>
                    <div className="waitingtime-title">Vorraussichtliche Wartezeit:</div>
                    <div className="waitingtime">1 STD 45 MIN</div>
                </div>
                <div className="bottom actions">
                    <Button className="border-blue" onClick={() => dispatch(AppApi.back())}>Zurück</Button>
                    <Button 
                    className="primary-red" 
                    onClick={async () => {
                        await dispatch(fetchEngagement());
                        dispatch(AppApi.gotoStep(currentUserId === null ? Step.SignIn : Step.Enqueue));
                    }}
                        >Anstellen</Button>
                </div>
            </main>
        </>
    );
};
