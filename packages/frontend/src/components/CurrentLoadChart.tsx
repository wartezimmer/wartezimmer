import React, { useState } from "react";

import { useThunkDispatch } from "../useThunkDispatch";

export const CurrentLoadChart = () => {
    const dispatch = useThunkDispatch();
    const [time, setTime] = useState("");
    const [travelTime, setTravelTime] = useState(30);
    // const counter = useSelector((state: State) => state.example.counter);

    return (
        <>
            <div className="load">
                <div className="load-key">Aktuelle Auslastung:</div>
                <div className="load-value">Gering</div>
            </div>
        </>
    );
};
