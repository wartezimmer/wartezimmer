
import { Button } from "antd";



import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "state";
import { ExampleApi } from "state/example";

export const ExampleCounter = () => {

    const dispatch = useDispatch();
    const counter = useSelector((state: State) => state.example.counter);

    return <>
        <h1>Counter:</h1>
        <p>{ counter }</p>
        <Button
            onClick={() => dispatch(ExampleApi.increment())}
        >
            Increment
        </Button>
        <Button
            onClick={() => dispatch(ExampleApi.reset())}
        >
            Reset
        </Button>
    </>;
};
