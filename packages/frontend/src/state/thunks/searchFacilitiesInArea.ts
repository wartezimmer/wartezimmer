import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, backend_url } from "../app";

export function searchFacilitiesInArea() {
    return async (dispatch: ReduxDispatch, getState) => {
        const { currentSearchTerm, currentArea } = getState().app;
        const params = {
            q: currentSearchTerm,
            ...currentArea
        }
        
        const paramString = new URLSearchParams(params).toString();
        const response = await fetch(`${backend_url}/facilities/search?${paramString}`);
        const json = await response.json();

        if (json.status === 'success') {
            dispatch(AppApi.setCurrentSearchResult(json.result));
            dispatch(AppApi.setFacilities([]));
        } 
        
        return json
    };
}
