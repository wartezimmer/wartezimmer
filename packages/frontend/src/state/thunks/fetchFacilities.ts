import { ReduxDispatch } from "../../useThunkDispatch";

export function fetchFacilities(search: string) {
    return async (dispatch: ReduxDispatch) => {
        // const result = await (await fetch("/backend/")).json();
        // dispatch(AppApi.setCurrentSearchResult(result as Facility[]));
    };
}
