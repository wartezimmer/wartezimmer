import "./app.css";

import { Layout } from "antd";
import { Enqueue } from "components/Enqueue";
import { NavBar } from "components/NavBar";
import { Queue } from "components/Queue";
import { Treatment } from "components/Treatment";
import { Wait } from "components/Wait";
import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { Step } from "state/app";

import { GoodBye } from "./components/GoodBye";
import { Search } from "./components/Search";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Welcome } from "./components/Welcome";
import { State } from "./state";

export const App = () => {
    const activeStep = useSelector((state: State) => state.app.activeStep);
    const collapseSideBar = useSelector((state: State) => state.app.collapseSideBar);

    function renderContent() {
        switch (activeStep) {
            case Step.Welcome:
                return <Welcome />;
            case Step.Search:
                return <Search />
            case Step.SignIn:
                return <SignIn />
            case Step.SignUp:
                return <SignUp />
            case Step.Enqueue:
                return <Enqueue />
            case Step.Queue:
                return <Queue />
            case Step.Wait:
                return <Wait />
            case Step.Treatment:
                return <Treatment />
            case Step.GoodBye:
                return <GoodBye />
            default:
                return <div>Page not found {Step[activeStep]}</div>;
        }
    }

    return <Layout>
        <Layout>
            <NavBar />
            {renderContent()}
        </Layout>
        <Layout.Sider
            collapsible
            collapsedWidth="0"
            collapsed={collapseSideBar}
            trigger={null}
        >
            Sider
        </Layout.Sider>
    </Layout>
};

export default hot(module)(App);
