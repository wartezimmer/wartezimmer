import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";

export function register(id: string, password: string) {
    return async (dispatch: ReduxDispatch, getState) => {
        // const result = await (await fetch("/backend/register")).json();
        // todo
        const facilitySelected = getState().app.currentFacility !== null;
        dispatch(AppApi.setCurrentUserId(id));
        dispatch(AppApi.gotoStep(facilitySelected ? Step.Enqueue : Step.Search));
    };
}
