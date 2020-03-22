import { Button, Input } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "state";
import { alterCurrentQueue, QueueAction } from "state/thunks/alterCurrentQueue";

import { useThunkDispatch } from "../useThunkDispatch";

export const Wait = () => {
    const dispatch = useThunkDispatch();
    const currentWaitTime = useSelector((state: State) => state.app.currentWaitTime);
    const [peopleInQueue, setPeopleInQueue] = useState(0);
    return (
        <>
            <header>Wartezimmer</header>
            <main>
                Aktuelle Wartezeit:
                {`${currentWaitTime} Minuten`}
                <Button onClick={() => dispatch(alterCurrentQueue(QueueAction.START_TREATMENT))}>Ich bin dran</Button>
                Wie viele leute warten jetzt gerade?
                <Input value={peopleInQueue} onChange={(e) => setPeopleInQueue(+e.target.value)} />
                <Button onClick={() => dispatch(alterCurrentQueue(QueueAction.CANCEL))}>Abbrechen</Button>
            </main>
        </>
    );
};
