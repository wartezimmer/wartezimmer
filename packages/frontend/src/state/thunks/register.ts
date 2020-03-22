import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";

export function register(id: string, password: string) {
    return async (dispatch: ReduxDispatch) => {
        // const result = await (await fetch("/backend/register")).json();
        // todo
        dispatch(AppApi.setCurrentUserId(id));
        dispatch(AppApi.gotoStep(Step.Enqueue));
    };
}
