import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi } from "../state/app";
import { enqueue } from "../state/thunks/enqueue";
import { useThunkDispatch } from "../useThunkDispatch";

export const Facility = () => {
    const dispatch = useThunkDispatch();
    const facility = useSelector((state: State) => state.app.currentFacility!);
    const travelTime = useSelector((state: State) => state.app.travelTime);
    const currentFacility = useSelector((state: State) => state.app.currentFacility);
    // const counter = useSelector((state: State) => state.example.counter);

    return (
        <>
            <main>
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
                    <div>Heute geöffnet von:</div>
                    <div>8 bis 16 Uhr</div>
                </div>
                <div>
                    <div>Aktuelle Auslastung</div>
                </div>
                <div>
                    <div>Chart</div>
                </div>
                <div>
                    <div>Vorraussichtliche Wartezeit</div>
                    <div>1 STD 45 MIN</div>
                </div>
                <div>
                    <Button onClick={() => dispatch(AppApi.back())}>Zurück</Button>
                    <Button className="primary-red" onClick={() => dispatch(enqueue())}>Anstellen</Button>
                </div>
            </main>
        </>
    );
};
