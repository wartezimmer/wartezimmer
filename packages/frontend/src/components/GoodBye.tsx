import { Button, Input } from "antd";
import React, { useState } from "react";
import { ExampleApi } from "state/example";

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
            Wie viele leute waren vor dir dran?
                    <Input value={peopleBeforeMe} onChange={(e) => setPeopleBeforeMe(+e.target.value)}/>
                <Button onClick={() => dispatch(ExampleApi.increment())}>MEHR INFOS</Button>
                <Button onClick={() => dispatch(ExampleApi.reset())}>ANMELDUNG</Button>
            </main>
        </>
    );
};
