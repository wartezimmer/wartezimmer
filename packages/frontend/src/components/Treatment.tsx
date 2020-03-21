import { Button, Input } from "antd";
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
                Wie viele leute waren vor dir dran?
                <Input value={peopleBeforeMe} onChange={(e) => setPeopleBeforeMe(+e.target.value)} />
                Todo: Bild
                <Button onClick={() => dispatch(alterCurrentQueue(QueueAction.STOP_TREATMENT))}>
                    Meine Behandlung ist beendet
                </Button>
            </main>
        </>
    );
};
