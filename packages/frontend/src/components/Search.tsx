import { Button, Input } from "antd";
import React, { useEffect } from "react";
import { fetchFacilities } from "state/thunks/fetchFacilities";
import { withSnackbar } from 'notistack';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { Map, TileLayer } from "react-leaflet";
import { SearchResultList } from "./SearchResultList";
import { hasGeolocation, getCurrentPosition } from "../geolocation";

export const Search = withSnackbar(({ enqueueSnackbar, closeSnackbar }) => {
    const dispatch = useThunkDispatch();
    const search = useSelector((state: State) => state.app.currentSearchTerm);
    const position = useSelector((state: State) => state.app.currentPosition);
    const searchingPosition = useSelector((state: State) => state.app.currentlySearchingPosition);
    let zoom = 13
    
    useEffect(() => {
        // TODO: setup position watcher for periodic updates
        if (hasGeolocation && !searchingPosition) {
            dispatch(AppApi.setCurrentlySearchingPosition(true))
            const positionPendingSnackbar = enqueueSnackbar('Versuche deine momentane Position zu finden...', { 
                persist: true,
                variant: 'info',
            });
            
            getCurrentPosition((pos) => {
                dispatch(AppApi.setCurrentlySearchingPosition(false))
                closeSnackbar(positionPendingSnackbar);
                enqueueSnackbar('Position gefunden!', { 
                    variant: 'success',
                    autoHideDuration: 3000,
                });
                const crd = pos.coords;
                dispatch(AppApi.setCurrentPosition([crd.latitude, crd.longitude]))
            }, (err) => {
                dispatch(AppApi.setCurrentlySearchingPosition(false))
                closeSnackbar(positionPendingSnackbar);
                enqueueSnackbar(`Position Fehler: ${err.message}`, { 
                    variant: 'error',
                    autoHideDuration: 7000,
                });
            })
        }
    }, [])

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
                autoHideDuration: 7000,
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
