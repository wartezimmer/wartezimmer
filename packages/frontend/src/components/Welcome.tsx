import { Button, Layout } from "antd";
import React, { useEffect } from "react";
import { useThunkDispatch } from "useThunkDispatch";
import { withSnackbar } from 'notistack';

import { AppApi, Step } from "../state/app";

export const Welcome = withSnackbar(({ enqueueSnackbar, closeSnackbar }) => {
    const dispatch = useThunkDispatch();

    useEffect(() => {
        enqueueSnackbar('BETA: Es gibt noch einiges zu tun. Feedback gerne an info@zwerk.io. Vielen Dank!', { 
            variant: 'info',
            autoHideDuration: 15000,
            action: (key) => (
                <Button onClick={() => { closeSnackbar(key) }}>
                    Ok
                </Button>
            )
        });
    }, [])

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
});
