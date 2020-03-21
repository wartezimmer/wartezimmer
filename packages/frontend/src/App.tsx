import { ExampleCounter } from "components/ExampleCounter";
import React from "react";
import { hot } from "react-hot-loader";

export const App = () => (
    <ExampleCounter />
);

export default hot(module)(App);
