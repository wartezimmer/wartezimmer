import { Reducer } from "./reduxHelper";

export enum Step {
    Welcome,
    Search,
    Facility,
    About,
    Imprint,
    // all following steps can only be accessed if a facility is set!
    Enqueue,
    Queue,
    Wait,
    GoodBye,
    Treatment,
}
export const backend_url = "/api";

export interface Facility {
    x: number,
    y: number,
    name: string;
    address_street: string;
    id: string;
    contact_phone: string;
    contact_email: string;
    contact_website: string;
    current_load: number;
    load: Load;
}

export interface Load {
    [time: string]: number;
}

export interface MapArea {
    celat: number,
    celng: number,
    nelat: number,
    nelng: number,
}

export interface AppState {
    activeStep: Step;
    earliestDeparture: string;
    currentFacility: Facility | null;
    currentSearchTerm: string;
    currentSearchResult: Facility[] | null;
    userAllowedLocation: boolean;
    currentPosition: Array<number> | null;
    center: Array<number> | null;
    zoom: number,
    currentArea: MapArea | null;
    currentlySearchingPosition: boolean;
    currentWaitTime: number;
    facilities: Facility[],
    history: Step[];
    travelTime: number;
    collapseSideBar: boolean;
}

export const defaultAppState: AppState = {
    activeStep: Step.Welcome,
    earliestDeparture: "16:30",
    currentFacility: null,
    currentSearchTerm: "",
    currentSearchResult: null,
    userAllowedLocation: true,
    currentPosition: null,
    center: [51.65892664880053, 10.129394531250002], // Germany as start position
    zoom: 6,
    currentArea: null,
    currentlySearchingPosition: false,
    currentWaitTime: 5,
    facilities: [],
    history: [],
    travelTime: 30,
    collapseSideBar: true,
};

class AppReducer extends Reducer<AppState> {
    constructor() {
        super(defaultAppState);

    }
    public back() {
        this.state.activeStep = Step.Search;
    }
    public gotoStep(step: Step) {
        // TODO: Still needed?
        // if (step > Step.Imprint && this.state.currentFacility === null) {
        //     step = Step.Search;
        // }
        window.history.pushState({ step: step}, Step[step]);
        this.state.history.push(this.state.activeStep);
        this.state.activeStep = step;
    }
    public setCurrentFacility(currentFacility: Facility | null) {
        this.state.activeStep = Step.Facility;
        this.state.currentFacility = currentFacility;
    }
    public setCurrentSearchTerm(term: string) {
        this.state.currentSearchTerm = term;
    }
    public setCurrentSearchResult(result: Facility[]) {
        this.state.currentSearchResult = result;
    }
    public setUserAllowedLocation(allowed: boolean) {
        this.state.userAllowedLocation = allowed;
    }
    public setCurrentPosition(position: Array<number>) {
        this.state.currentPosition = position;
    }
    public setZoom(zoom: number) {
        this.state.zoom = zoom;
    }
    public setCenter(center: Array<number>) {
        this.state.center = center;
    }
    public setCurrentArea(area: MapArea) {
        this.state.currentArea = area;
    }
    public setCurrentlySearchingPosition(searching: boolean) {
        this.state.currentlySearchingPosition = searching;
    }
    public setTravelTime(time: number) {
        this.state.travelTime = time;
    }
    public setEarliestDeparture(time: string) {
        this.state.earliestDeparture = time;
    }
    public setCurrentWaitTime(time: number) {
        this.state.currentWaitTime = time;
    }
    public setFacilities(facilities: Facility[]) {
        this.state.facilities = facilities;
    }
    public setSideBarCollapsed(collapsed: boolean) {
        this.state.collapseSideBar = collapsed;
    }
    public toggleSideBar() {
        this.state.collapseSideBar = !this.state.collapseSideBar;
    }
}

const AppReducerInstance = new AppReducer();
export const AppApi = AppReducerInstance.getApi();
export const AppReduxReducer = AppReducerInstance.getReduxReducer();
