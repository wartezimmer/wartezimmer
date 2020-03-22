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
    About,
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
    collapseSideBar: boolean;
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
    collapseSideBar: true,
};

class AppReducer extends Reducer<AppState> {
    constructor() {
        super(defaultAppState);
    }
    public back() {
        while (this.state.history.length > 0) {
            const lastStep = this.state.history.pop()!;
            if (this.state.currentUserId === null
                || (lastStep !== Step.SignIn && lastStep !== Step.SignUp)) {
                this.state.activeStep = lastStep;
            }
        }
    }
    public gotoStep(step: Step) {
        this.state.history.push(this.state.activeStep);
        this.state.activeStep = step;
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
    public setSideBarCollapsed(collapsed: boolean) {
        console.log(collapsed, this.state.collapseSideBar);
        this.state.collapseSideBar = collapsed;
        console.log(collapsed, this.state.collapseSideBar);
    }
    public toggleSideBar() {
        console.log("toggle in api");
        this.state.collapseSideBar = !this.state.collapseSideBar;
    }
}

const AppReducerInstance = new AppReducer();
export const AppApi = AppReducerInstance.getApi();
export const AppReduxReducer = AppReducerInstance.getReduxReducer();
