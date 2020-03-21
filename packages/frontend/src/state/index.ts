import { setAutoFreeze } from "immer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { ExampleReduxReducer, ExampleState } from "./example";

import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

setAutoFreeze(false);

function persist(reducer: any, key: string, whitelist?: string[], blacklist?: string[]) {
    return persistReducer({
        blacklist,
        key,
        stateReconciler: autoMergeLevel2,  // alternatives: autoMigrateLevel1 (default), autoMigrateLevel2
        storage,
        whitelist,
    }, reducer);
}

export const rootReducer = combineReducers({
    example: persist(ExampleReduxReducer, "example", ["counter"]),
});

// tslint:disable-next-line: no-empty-interface
export interface State {
    example: ExampleState;
}
