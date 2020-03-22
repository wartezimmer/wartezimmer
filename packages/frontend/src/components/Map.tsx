import React from "react";
import { useSelector } from "react-redux";

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
