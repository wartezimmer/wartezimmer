import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function fetchFacilities(search: string) {
    return async (dispatch: ReduxDispatch) => {
        // const result = await (await fetch("/backend/")).json();
        dispatch(AppApi.setCurrentSearchResult([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) =>
            ({
                current_load: 0,
                email: "test@test.de",
                id: "1234",
                load: {},
                name: "Testklinik " + n,
                phone: "+49111",
                street: "test str. 10",
                website: "test.de",
            }))));
    };
}
