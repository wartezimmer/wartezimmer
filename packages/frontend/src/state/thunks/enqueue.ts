import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";

export function enqueue() {
    return async (dispatch: ReduxDispatch) => {
        // const result = await (await fetch("/backend/register")).json();
        // todo
        dispatch(AppApi.gotoStep(Step.Queue));
    };
}
