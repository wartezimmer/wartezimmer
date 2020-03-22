import { Button } from "antd";
import React, { useState } from "react";

import { alterCurrentQueue, QueueAction } from "../state/thunks/alterCurrentQueue";
import { useThunkDispatch } from "../useThunkDispatch";

export const Treatment = () => {
    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);
    const [peopleBeforeMe, setPeopleBeforeMe] = useState(0);

    return (
        <>
            <header>Behandlungsraum</header>
            <main>
                In behandlung seit
                Todo: Clock
                <Button onClick={() => dispatch(alterCurrentQueue(QueueAction.STOP_TREATMENT))}>
                    Behandlung beendet
                </Button>
            </main>
        </>
    );
};
