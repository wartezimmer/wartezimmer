import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { fetchFacilities } from "state/thunks/fetchFacilities";

import { AppApi, Step } from "../state/app";
import { Map } from "./Map";
import { useThunkDispatch } from "../useThunkDispatch";

export const Search = () => {
    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);
    const [search, setSearch] = useState("");
    return (
        <>
            <header>WARTESCHLEIFE</header>
            <main>
                <Form.Item>
                    <Input value={search} onChange={(e) => e.target.value}/>
                </Form.Item>
                <Button onClick={() => dispatch(AppApi.gotoStep(Step.SignIn))}>Anmeldung</Button>
                <Button onClick={() => dispatch(fetchFacilities(search))}>Suchen</Button>
                <Map />
            </main>
        </>
    );
};
