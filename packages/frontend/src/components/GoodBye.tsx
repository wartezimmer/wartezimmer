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
            <header>
                <div className="space"></div>
                <h1>Good Bye</h1>
                <div className="space"></div>
            </header>
            <main>
            Vielen Dank und gute Besserung!
                <Button onClick={() => dispatch(AppApi.gotoStep(Step.Search))}>Erneut Anmelden</Button>
            </main>
        </>
    );
};
