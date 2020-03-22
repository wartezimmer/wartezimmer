import { Button } from "antd";
import React from "react";
import { ExampleApi } from "state/example";

import { useThunkDispatch } from "../useThunkDispatch";

export const Search = () => {
    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);

    return (
        <>
            <header>WARTESCHLEIFE</header>
            <main>
                <Button onClick={() => dispatch(ExampleApi.increment())}>MEHR INFOS</Button>
                <Button onClick={() => dispatch(ExampleApi.reset())}>ANMELDUNG</Button>
            </main>
        </>
    );
};
