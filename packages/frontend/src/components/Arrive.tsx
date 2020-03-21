import { Button, Layout } from "antd";
import React from "react";
import { ExampleApi } from "state/example";

import { useThunkDispatch } from "../useThunkDispatch";

export const Arrive = () => {
    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);
    return <>
        <Layout>
            <Layout.Header>Ankommen</Layout.Header>
            <Layout.Content>
                <Button
                    onClick={() => dispatch(ExampleApi.increment())}
                >
                    MEHR INFOS
        </Button>
                <Button
                    onClick={() => dispatch(ExampleApi.reset())}
                >
                    ANMELDUNG
        </Button>

            </Layout.Content>
        </Layout>
    </>;
};
