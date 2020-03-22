import { Button, Layout } from "antd";
import React from "react";
import { useThunkDispatch } from "useThunkDispatch";

import { AppApi, Step } from "../state/app";


const { Content } = Layout;

export const Welcome = () => {
    const dispatch = useThunkDispatch();

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
                    <div className="text">Unnötige Wartezeiten vermeiden und so das Infektionsrisiko von COVID-19 gering halten</div>
                    <div className="btn-group">
                        <Button className="border-blue info-btn" onClick={() => dispatch(AppApi.gotoStep(Step.About))}>Infos</Button>
                        <Button className="primary-blue" onClick={() => dispatch(AppApi.gotoStep(Step.Search))}>Karte</Button>
                    </div>
                </div>
            </main>
        </>
    );
};
