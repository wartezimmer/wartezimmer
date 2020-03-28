import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, backend_url } from "../app";

export function fetchFacilitiesInArea() {
    return async (dispatch: ReduxDispatch, getState) => {
        const { currentArea } = getState().app;
        const params = new URLSearchParams(currentArea).toString();
        const response = await fetch(`${backend_url}/facilities/area?${params}`);
        const json = await response.json();

        if (json.status === 'success') {
            dispatch(AppApi.setFacilities(json.result));
        } 
        
        return json
    };
}
