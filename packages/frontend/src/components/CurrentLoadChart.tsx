import React, { useState } from "react";

import { useThunkDispatch } from "../useThunkDispatch";

export const CurrentLoadChart = () => {
    const dispatch = useThunkDispatch();
    const [time, setTime] = useState("");
    const [travelTime, setTravelTime] = useState(30);
    // const counter = useSelector((state: State) => state.example.counter);

    return (
        <>
            Aktuelle Auslastung
        </>
    );
};
