import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";
import { backend_url } from "../app";

export function cancel() {
    return async (dispatch: ReduxDispatch) => {
        await fetch(`${backend_url}/current-queue/cancel`, {
            method: 'POST'
        });
        dispatch(AppApi.gotoStep(Step.Enqueue));
    };
}
