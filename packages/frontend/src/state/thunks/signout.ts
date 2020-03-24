import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";

export function signout() {
    return async (dispatch: ReduxDispatch, getState) => {
        // const result = (await fetch("/backend/login")).json();
        // todo
        dispatch(AppApi.setCurrentUserId(null))
        dispatch(AppApi.gotoStep(Step.Welcome));
    };
}
