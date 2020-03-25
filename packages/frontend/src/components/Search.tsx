import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { fetchFacilities } from "state/thunks/fetchFacilities";
import { withSnackbar } from 'notistack';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi, Step } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { SearchResultList } from "./SearchResultList";

export const Search = withSnackbar(({ enqueueSnackbar }) => {
    const dispatch = useThunkDispatch();
    const search = useSelector((state: State) => state.app.currentSearchTerm);
    let position = [52.517, 13.388];
    let zoom = 13

    async function onSearch() {
        try {
            await dispatch(fetchFacilities())
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
    }

    return (
        <>
            <main id="search">
                <div className="head">
                    <Input allowClear placeholder="Meine Einrichtung finden" value={search} onChange={(e) => {
                        if (e.target.value == "") {
                            dispatch(AppApi.setCurrentSearchResult([]))
                        }
                        dispatch(AppApi.setCurrentSearchTerm(e.target.value));
                    }} onPressEnter={onSearch}/>
                    <Button className="primary-red" onClick={onSearch} icon={<SearchOutlined />}/> 
                </div>
                <SearchResultList />

                <Map  center={position} zoom={zoom}>
    
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                </Map>
            </main>
        </>
    );
});
