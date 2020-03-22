import { Reducer } from "./reduxHelper";

export interface ExampleState {
    counter: number;
}

export const defaultExampleState: ExampleState = {
    counter: 0,
};

class ExampleReducer extends Reducer<ExampleState> {
    constructor() {
        super(defaultExampleState);
    }

    public increment() {
        this.state.counter = this.state.counter + 1;
    }

    public reset() {
        this.state.counter = 0;
    }

}

const ExampleReducerInstance = new ExampleReducer();
export const ExampleApi = ExampleReducerInstance.getApi();
export const ExampleReduxReducer = ExampleReducerInstance.getReduxReducer();
