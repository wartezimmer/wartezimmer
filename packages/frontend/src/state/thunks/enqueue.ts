import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";
import { backend_url } from "../app";

export function enqueue() {
    return async (dispatch: ReduxDispatch, getState) => {
        const { currentFacility: facility, travelTime, earliestDeparture } = getState().app;
        await fetch(`${backend_url}/facility/${facility.id}/enqueue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                earliestDeparture: Math.floor(new Date().getTime() / 1000000.0), // TODO: Get as timestamp from TimePicker
                travelTime 
            })
        });
        // TODO: set state enqued
        // TODO: Handle error, show snackbar error with helpful message
        dispatch(AppApi.gotoStep(Step.Queue));
    };
}
