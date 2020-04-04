import React, { useState } from "react";

import { useThunkDispatch } from "../useThunkDispatch";

export const Imprint = () => {
    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);
    const [peopleBeforeMe, setPeopleBeforeMe] = useState(0)

    return (
        <>
            <header>
                <div className="space"></div>
                <h1>Impressum</h1>
                <div className="space"></div>
            </header>
            <main>
                <h2>gGmbH i.G.</h2>
                <div>
                    <h4>Auslastungsdaten ICU/ECMO</h4>
                    <a href="https://www.divi.de/register/intensivregister">Divi.de</a>
                </div>
            </main>
        </>
    );
};
