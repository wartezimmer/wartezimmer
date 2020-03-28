import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, backend_url } from "../app";

// interface FacilityParams extends Object {
//     q: string;
//     lat: number;
//     lng: number;
// }

export function fetchFacilities() {
    return async (dispatch: ReduxDispatch, getState) => {
        const { currentSearchTerm, currentPosition } = getState().app;
        const params = {
            q: currentSearchTerm
        }
        if (currentPosition) {
            Object.assign(params, {
                lat: currentPosition[0],
                lng: currentPosition[1]
            })
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
