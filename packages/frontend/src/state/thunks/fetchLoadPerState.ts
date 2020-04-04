import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, backend_url } from "../app";

let timeout:any = null

export function fetchLoadPerState() {
    return async (dispatch: ReduxDispatch) => {
        clearTimeout(timeout)

        timeout = setTimeout(async () => {
            const response = await fetch(`${backend_url}/divi/avg-per-state`);
            const json = await response.json();

            if (json.status === 'success') {
                dispatch(AppApi.setLoadPerState(json.result));
            }
            // TODO: handle and report error
        }, 500)
    };
}
