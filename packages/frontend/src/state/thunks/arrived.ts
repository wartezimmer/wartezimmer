import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";
import { backend_url } from "../app";

export function arrived() {
    return async (dispatch: ReduxDispatch) => {
        await fetch(`${backend_url}/current-queue/arrived`, {
            method: 'POST'
        });
        // TODO: set state arrived
        // TODO: Handle error, show snackbar error with helpful message
        dispatch(AppApi.gotoStep(Step.Wait));
    };
}
