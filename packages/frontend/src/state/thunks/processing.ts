import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";
import { backend_url } from "../app";

export function processing() {
    return async (dispatch: ReduxDispatch) => {
        await fetch(`${backend_url}/current-queue/processing`, {
            method: 'POST'
        });
        // TODO: set state processing
        // TODO: Handle error, show snackbar error with helpful message
        dispatch(AppApi.gotoStep(Step.Treatment));
    };
}
