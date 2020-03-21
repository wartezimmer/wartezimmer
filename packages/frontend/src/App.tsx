import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { Step } from "state/app";

import { Welcome } from "./components/Welcome";
import { State } from "./state";

export const App = () => {
    const activeStep = useSelector((state: State) => state.app.activeStep)
    {
        switch (activeStep) {
            case Step.Welcome:
                return <Welcome />;
        
            default:
                return <div></div>;
        }
    }
    }
;

export default hot(module)(App);
