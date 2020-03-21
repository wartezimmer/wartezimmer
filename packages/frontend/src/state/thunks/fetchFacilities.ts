import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Facility, Step } from "../app";

export function fetchFacilities() {
    return async (dispatch: ReduxDispatch) => {
        const result = await (await fetch("/backend/")).json();
        dispatch(AppApi.setCurrentSearchResult(result as Facility[]));
        dispatch(AppApi.gotoStep(Step.Search));
    };
}
