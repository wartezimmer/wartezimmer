import { Button, Layout } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { ExampleApi } from "state/example";




export const Queue = () => {

    const dispatch = useDispatch();
    // const counter = useSelector((state: State) => state.example.counter);

    return <>
        <Layout>
            <Layout.Header>Anstehen</Layout.Header>
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
