import { Welcome } from "../components/Welcome";
import { Reducer } from "./reduxHelper";

export enum Step {
    Welcome,
    Search,
    Facility,
    SignUp,
    Enqueue,
    Queue,
    Wait,
    Treatment,
    GoodBy,
}

export interface Facility {
    name: string;
}

export interface AppState {
    activeStep: Step;
    currentSearchResult: Facility[] | null;
}

export const defaultAppState: AppState = {
    activeStep: Step.Welcome,
    currentSearchResult: null,
};

class AppReducer extends Reducer<AppState> {
    constructor() {
        super(defaultAppState);
    }
    public gotoStep(step: Step) {
        this.state.activeStep = step;
    }
    public setCurrentSearchResult(result: Facility[]) {
        this.state.currentSearchResult = result;
    }
}

const AppReducerInstance = new AppReducer();
export const AppApi = AppReducerInstance.getApi();
export const AppReduxReducer = AppReducerInstance.getReduxReducer();
