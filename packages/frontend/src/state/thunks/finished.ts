import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";
import { backend_url } from "../app";

export function finished() {
    return async (dispatch: ReduxDispatch) => {
        await fetch(`${backend_url}/current-queue/finished`, {
            method: 'POST'
        });
        // TODO: set state finished
        // TODO: Handle error, show snackbar error with helpful message
        dispatch(AppApi.gotoStep(Step.GoodBye));
    };
}
