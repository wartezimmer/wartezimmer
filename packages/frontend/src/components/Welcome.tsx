import { Button, Layout, Typography } from "antd";
import React from "react";
import { ExampleApi } from "state/example";

import { fetchFacilities } from "../state/thunks/fetchFacilities";
import { useThunkDispatch } from "../useThunkDispatch";




export const Welcome = () => {

    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);

    return <>
        <Layout>
            <header><Typography.Title>WARTESCHLEIFE</Typography.Title></header>
            <main>
                <Button
                    onClick={() => dispatch(ExampleApi.increment())}
                >
                    MEHR INFOS
        </Button>
                <Button
                    onClick={() => dispatch(fetchFacilities())}
                >
                    ANMELDUNG
        </Button>

            </main>
        </Layout>
    </>;
};
