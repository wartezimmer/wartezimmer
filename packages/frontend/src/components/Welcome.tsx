import { Button, Layout } from "antd";
import React from "react";
import { ExampleApi } from "state/example";

import { AppApi, Step } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

const { Content } = Layout;

export const Welcome = () => {
    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);

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
                    <div>Unnötige Wartezeiten vermeiden und so das Infektionsrisiko von COVID-19 gering halten</div>
                    <Button className="border-blue" onClick={() => dispatch(ExampleApi.increment())}>Infos</Button>
                    <Button className="primary-blue" onClick={() => dispatch(AppApi.gotoStep(Step.SignUp))}>Karte</Button>

                </div>
            </main>
        </>
    );
};
