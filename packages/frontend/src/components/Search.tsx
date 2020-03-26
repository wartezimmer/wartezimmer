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
import { hasGeolocation, getCurrentPosition } from "../geolocation";

export const Search = withSnackbar(({ enqueueSnackbar }) => {
    const dispatch = useThunkDispatch();
    const search = useSelector((state: State) => state.app.currentSearchTerm);
    const [position, setPosition] = useState([52.517, 13.388]);
    let zoom = 13

    if (hasGeolocation) {
        getCurrentPosition((pos) => {
            const crd = pos.coords;
            setPosition([crd.latitude, crd.longitude])
        }, (err) => {
            enqueueSnackbar(`Position Fehler: ${err.message}`, { 
                variant: 'error',
            });
        })
    }

    async function onSearch() {
        if (search.length < 3) {
            enqueueSnackbar('Bitte geben Sie mindestens 3 Zeichen ein', { 
                variant: 'info',
            });
            return;
        }

        const response = await dispatch(fetchFacilities())
        
        if (response.status === 'error' && response.code === 'no_query') {
            dispatch(AppApi.setCurrentSearchResult([]));
            enqueueSnackbar('Bitte geben Sie einen Suchbegriff ein', { 
                variant: 'info',
            });
        } else if (response.status === 'error') {
            enqueueSnackbar(`Fehler: ${response.code}`, { 
                variant: 'error',
            });
        } else if (response.result.length === 0) {
            enqueueSnackbar(`Leider nichts gefunden :(`);
        }
    }

    return (
        <>
            <main id="search">
                <div className="head">
                    <Input allowClear placeholder="Meine Einrichtung finden" value={search} onChange={(e) => {
                        if (e.target.value.length === 0) {
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
