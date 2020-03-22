import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";

export function login(id: string, password: string) {
    return async (dispatch: ReduxDispatch, getState) => {
        // const result = (await fetch("/backend/login")).json();
        // todo
        const facilitySelected = getState().app.currentFacility !== null;

        dispatch(AppApi.setCurrentUserId(id))
        dispatch(AppApi.gotoStep(facilitySelected ? Step.Enqueue : Step.Search));
    };
}
