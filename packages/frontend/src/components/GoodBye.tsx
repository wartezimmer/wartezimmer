import { Button } from "antd";
import React, { useState } from "react";

import { AppApi, Step } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export const GoodBye = () => {
    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);
    const [peopleBeforeMe, setPeopleBeforeMe] = useState(0)

    return (
        <>
            <main>
                <div id="banner" className="uppercase" >
                    <div className="light">Die</div>
                    <h1>WARTE<br />SCHLEIFE</h1>
                    <h2>Warten im</h2>
                    <h2>Wohnzimmer</h2>
                </div>
                <div id="info">
                    <img src="/images/logo.svg" alt="" />
                </div>
                
                <div id="thanks">
                    Vielen Dank <br/> und gute <br/> Besserung!
                </div>
                <div className="bottom actions">
                    <div></div>
                    <Button className="primary-red" onClick={() => dispatch(AppApi.gotoStep(Step.Search))}>Zurück zur Karte</Button>
                </div>
            </main>
        </>
    );
};
