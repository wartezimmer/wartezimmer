import { Welcome } from "../components/Welcome";
import { Reducer } from "./reduxHelper";

export enum Step {
    Welcome,
    Search,
    Facility,
    SignIn,
    SignUp,
    Enqueue,
    Queue,
    Wait,
    Treatment,
    GoodBye,
}

export interface Facility {
    name: string;
    street: string;
    id: string;
    phone: string;
    email: string;
    website: string;
    current_load: number;
    load: Load;
}

export interface Load {
    [time: string]: number;
}

export interface AppState {
    activeStep: Step;
    availableTime: string;
    currentFacility: Facility | null;
    currentSearchResult: Facility[] | null;
    currentWaitTime: number;
    currentUserId: string | null;
    history: Step[];
    travelTime: number;
}

export const defaultAppState: AppState = {
    activeStep: Step.Welcome,
    availableTime: "16:30",
    currentFacility: null,
    currentSearchResult: null,
    currentWaitTime: 5,
    currentUserId: null,
    history: [],
    travelTime: 30,
};

class AppReducer extends Reducer<AppState> {
    constructor() {
        super(defaultAppState);
    }
    public back() {
        while (this.state.history.length > 0) {
            const lastStep = this.state.history.pop()!;
            if (this.state.currentUserId === null || (lastStep !== Step.SignIn && lastStep !== Step.SignUp)) {
                this.state.activeStep = this.state.history.pop()!;
            }
        }
    }
    public gotoStep(step: Step) {
        this.state.activeStep = step;
        this.state.history.push(step);
    }
    public setCurrentFacility(currentFacility: Facility | null) {
        this.state.currentFacility = currentFacility;
    }
    public setCurrentSearchResult(result: Facility[]) {
        this.state.currentSearchResult = result;
    }
    public setCurrentUserId(id: string) {
        this.state.currentUserId = id;
    }
    public setTravelTime(time: number) {
        this.state.travelTime = time;
    }
    public setAvailableTime(time: string) {
        this.state.availableTime = time;
    }
    public setCurrentWaitTime(time: number) {
        this.state.currentWaitTime = time;
    }
}

const AppReducerInstance = new AppReducer();
export const AppApi = AppReducerInstance.getApi();
export const AppReduxReducer = AppReducerInstance.getReduxReducer();
