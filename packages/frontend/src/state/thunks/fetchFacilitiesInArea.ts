import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, backend_url } from "../app";

let timeout:any = null

export function fetchFacilitiesInArea() {
    return async (dispatch: ReduxDispatch, getState) => {
        clearTimeout(timeout)
        timeout = setTimeout(async () => {
            const { currentArea } = getState().app;
            const params = new URLSearchParams(currentArea).toString();
            const response = await fetch(`${backend_url}/facilities/area?${params}`);
            const json = await response.json();

            if (json.status === 'success') {
                dispatch(AppApi.setFacilities(json.result));
            } 
            // TODO: handle and report error
        }, 300)
    };
}
