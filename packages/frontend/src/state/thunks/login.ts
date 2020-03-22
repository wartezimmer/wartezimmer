import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";

export function login(id: string, password: string) {
    return async (dispatch: ReduxDispatch) => {
        // const result = (await fetch("/backend/login")).json();
        // todo
        dispatch(AppApi.setCurrentUserId(id))
        dispatch(AppApi.gotoStep(Step.Enqueue));
    };
}
