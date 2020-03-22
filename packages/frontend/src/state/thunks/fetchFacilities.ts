import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function fetchFacilities(search: string) {
    return async (dispatch: ReduxDispatch) => {
        // const result = await (await fetch("/backend/")).json();
        dispatch(AppApi.setCurrentSearchResult([
            // {
                
            // }
        ]));
    };
}
