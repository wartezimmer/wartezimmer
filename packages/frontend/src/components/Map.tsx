import React from "react";
import { useSelector } from "react-redux";
import { Facility } from "state/app";

import { State } from "../state";
import { useThunkDispatch } from "../useThunkDispatch";

export const Map = () => {
    const dispatch = useThunkDispatch();
    const searchResult = useSelector((state: State) => state.app.currentSearchResult);
    return (
        <>
        </>
    );
};
