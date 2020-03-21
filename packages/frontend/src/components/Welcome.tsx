import { Button } from "antd";
import React from "react";
import { ExampleApi } from "state/example";

import { AppApi, Step } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export const Welcome = () => {
    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);

    return (
        <>
            <header>
                <h1>WARTESCHLEIFE</h1>
            </header>
            <main>
                <Button onClick={() => dispatch(ExampleApi.increment())}>MEHR INFOS</Button>
                <Button onClick={() => dispatch(AppApi.gotoStep(Step.SignUp))}>ANMELDUNG</Button>
            </main>
        </>
    );
};
