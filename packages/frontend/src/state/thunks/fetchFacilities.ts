import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";

export function fetchFacilities() {
    return (dispatch: ReduxDispatch) => {
        
        dispatch(AppApi.gotoStep(Step.Search))
    };
}
