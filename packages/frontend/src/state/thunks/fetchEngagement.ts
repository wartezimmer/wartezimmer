import { ReduxDispatch } from "../../useThunkDispatch";
import { backend_url } from "../app";

export function fetchEngagement() {
    return async (dispatch: ReduxDispatch, getState) => {
        const facility = getState().app.currentFacility;
        await fetch(`${backend_url}/facility/${facility.id}/engage`, {
            method: 'POST'
        });
    };
}
