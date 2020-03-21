import { Reducer } from "./reduxHelper";

export enum Step {
    Welcome,

}

export interface AppState {
    activeStep: Step;
}

export const defaultAppState: AppState = {
    activeStep: Step.Welcome,
};

class AppReducer extends Reducer<AppState> {
    constructor() {
        super(defaultAppState);
    }
    public gotoStep(step: Step) {
        this.state.activeStep = step;
    }
}

const AppReducerInstance = new AppReducer();
export const AppApi = AppReducerInstance.getApi();
export const AppReduxReducer = AppReducerInstance.getReduxReducer();
