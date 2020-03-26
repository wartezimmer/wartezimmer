import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, backend_url } from "../app";

export function fetchFacilities() {
    return async (dispatch: ReduxDispatch, getState) => {
        const { currentSearchTerm } = getState().app;
        const response = await fetch(`${backend_url}/facilities/search?q=${currentSearchTerm}`);
        const json = await response.json();

        if (json.status === 'success') {
            dispatch(AppApi.setCurrentSearchResult(json.result));
        } 
        
        return json
    };
}
