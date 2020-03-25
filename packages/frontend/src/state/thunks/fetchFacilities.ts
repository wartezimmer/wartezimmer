import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, backend_url } from "../app";

export function fetchFacilities(search: string) {
    return async (dispatch: ReduxDispatch) => {
        const response = await fetch(`${backend_url}/facilities/search?q=${search}`);
        const json = await response.json();

        if (json.status === 'success') {
            dispatch(AppApi.setCurrentSearchResult(json.result));
        } else if (json.status === 'error' && json.code === 'no_query') {
            dispatch(AppApi.setCurrentSearchResult([]));
        } else if (json.status === 'error') {
            throw new Error(json.code);
        }
    };
}
