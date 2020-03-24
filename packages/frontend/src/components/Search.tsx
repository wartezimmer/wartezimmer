import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { fetchFacilities } from "state/thunks/fetchFacilities";

import { AppApi, Step } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { Map } from "./Map";
import { SearchResultList } from "./SearchResultList";

export const Search = () => {
    const dispatch = useThunkDispatch();
    const [search, setSearch] = useState("");
    
    return (
        <>
            <main>
                <div id="search">
                    <h2>Meine Einrichtung finden</h2>
                    <Form.Item>
                        <Input value={search} onChange={(e) => setSearch(e.target.value)}/>
                    </Form.Item>
                    <div className="btn-group">
                        <Button className="primary-red" onClick={() => dispatch(fetchFacilities(search))}>Suchen</Button>
                    </div>
                </div>
                <SearchResultList />
                <Map />
            </main>
        </>
    );
};
