import { Button, Form, Input } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi } from "../state/app";
import { enqueue } from "../state/thunks/enqueue";
import { useThunkDispatch } from "../useThunkDispatch";
import { CurrentLoadChart } from "./CurrentLoadChart";

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
                    <div className="doc-type">Praxis</div>
                    <div className="doc-name">Dr. Müller</div>
                    <div className="doc-address">Musterstr. 18, 12345 Berlin</div>
                    <div className="doc-phone">030-41234XXXX</div>
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
                    <Button>Zurück</Button>
                    <Button className="primary-red">Anstellen</Button>
                </div>
            </main>
        </>
    );
};
