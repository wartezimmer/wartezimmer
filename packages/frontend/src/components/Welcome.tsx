import { Button } from "antd";
import React from "react";
import { useThunkDispatch } from "useThunkDispatch";

import { AppApi, Step } from "../state/app";

export const Welcome = () => {
    const dispatch = useThunkDispatch();

    return (
        <>
            <header>

            </header>
            <main>
                <div id="banner" className="uppercase" >
                    <div className="light">Die</div>
                    <h1>WARTE<br/>SCHLEIFE</h1>
                    <h2>Warten im</h2>
                    <h2>Wohnzimmer</h2> this changed
                </div>
                <div id="info">
                    <div className="text">Unnötige Wartezeiten vermeiden und so das Infektionsrisiko von COVID-19 gering halten</div>
                    <Button className="border-blue" onClick={() => dispatch(AppApi.gotoStep(Step.About))}>Infos</Button>
                    <Button className="primary-blue" onClick={() => dispatch(AppApi.gotoStep(Step.Search))}>Karte</Button>
                </div>
            </main>
        </>
    );
};
