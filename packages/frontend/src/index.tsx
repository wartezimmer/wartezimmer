import "antd/dist/antd.css";

import * as Sentry from "@sentry/browser";
import { CaptureConsole, RewriteFrames } from "@sentry/integrations";
import { CURRENT_ENVIRONMENT } from "environment";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import thunk from "redux-thunk";

import App from "./App";
import { rootReducer } from "./state";
import { AppApi, Step } from "./state/app";



if (SENTRY_DSN !== null) {
    Sentry.init({
        dsn: SENTRY_DSN,
        environment: CURRENT_ENVIRONMENT,
        integrations: [new RewriteFrames(), new CaptureConsole({ levels: ["error"] })],
        release: COMMIT_HASH_LONG,
    });
}

const root = document.createElement("div");
document.body.appendChild(root);



const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

window.addEventListener("popstate", (e: PopStateEvent) => {
    console.log(e);
    store.dispatch(AppApi.back())
})

store.subscribe(() => {
    (window as any).state = store.getState();
});
(window as any).go = (step: Step) => store.dispatch(AppApi.gotoStep(step))
const persistor = persistStore(store);
render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    root,
);
