import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { fetchFacilities } from "state/thunks/fetchFacilities";
import { withSnackbar } from 'notistack';

import { AppApi, Step } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { Map } from "./Map";
import { SearchResultList } from "./SearchResultList";

export const Search = withSnackbar(({ enqueueSnackbar }) => {
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
                        <Button className="primary-red" onClick={async () => {
                            try {
                                await dispatch(fetchFacilities(search))
                            } catch(err) {
                                switch(err.message) {
                                    case 'no_query': {
                                        enqueueSnackbar('Bitte geben Sie einen Suchbegriff ein');
                                        break;
                                    }
                                    default: {
                                        enqueueSnackbar(`Fehler: ${err.message}`);
                                        break;
                                    }
                                }
                            }
                        }}>Suchen</Button>
                    </div>
                </div>
                <SearchResultList />
                <Map />
            </main>
        </>
    );
});
