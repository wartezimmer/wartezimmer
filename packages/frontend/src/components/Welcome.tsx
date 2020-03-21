import { Button, Layout } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { ExampleApi } from "state/example";

import { fetchFacilities } from "../state/thunks/fetchFacilities";




export const Welcome = () => {

    const dispatch = useDispatch();
    // const counter = useSelector((state: State) => state.example.counter);

    return <>
        <Layout>
            <Layout.Header>WARTESCHLEIFE</Layout.Header>
            <Layout.Content>
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

            </Layout.Content>
        </Layout>
    </>;
};
