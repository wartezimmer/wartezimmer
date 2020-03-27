import { Button, Input } from "antd";
import React, { useEffect, createRef } from "react";
import { withSnackbar } from 'notistack';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

import { fetchFacilities } from "state/thunks/fetchFacilities";
import { fetchFacilitiesInArea } from "state/thunks/fetchFacilitiesInArea";
import { State } from "../state";
import { AppApi, MapArea, Facility } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import L from 'leaflet';
import { 
    Map, 
    TileLayer, 
    Marker, 
    CircleMarker,
    Viewport,
    FeatureGroup,
    Popup,
} from "react-leaflet";
import { SearchResultList } from "./SearchResultList";
import { hasGeolocation, getCurrentPosition } from "../geolocation";

function areaQueryFromBounds(bounds): MapArea {
    const center = bounds.getCenter()
    const northEast = bounds.getNorthEast()
    return {
        celat: center.lat,
        celng: center.lng,
        nelat: northEast.lat,
        nelng: northEast.lng,
    };
}

export const Search = withSnackbar(({ enqueueSnackbar, closeSnackbar }) => {
    const dispatch = useThunkDispatch();
    const search = useSelector((state: State) => state.app.currentSearchTerm);
    const position = useSelector((state: State) => state.app.currentPosition);
    const searchingPosition = useSelector((state: State) => state.app.currentlySearchingPosition);
    const facilities = useSelector((state: State) => state.app.facilities);
    const mapRef = createRef<Map>()
    let zoom = 12

    // Bound to germany for the time being
    const southWest = L.latLng(46.27103747280261, 2.3730468750000004);
    const northEast = L.latLng(56.47462805805594, 17.885742187500004);
    const mapBounds = L.latLngBounds(southWest, northEast);
    
    useEffect(() => {
        mapRef.current.leafletElement.setMinZoom(6);
        const bounds = mapRef.current.leafletElement.getBounds();
        dispatch(AppApi.setCurrentArea(areaQueryFromBounds(bounds)))

        if (searchingPosition) {
            dispatch(fetchFacilitiesInArea())
        }

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
                dispatch(fetchFacilitiesInArea())
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

    const onViewportChanged = async (viewport: Viewport) => {
        if (mapRef) {
            const bounds = mapRef.current.leafletElement.getBounds();
            dispatch(AppApi.setCurrentArea(areaQueryFromBounds(bounds)))
            dispatch(fetchFacilitiesInArea())
        }
    }

    const ClinikMarkersList = ({ facilities }: { facilities: Array<Facility> }) => {
        const items = facilities.map(({ id, x, y, name }) => (
            <Marker key={id} position={[y, x]}>
                <Popup>{name}</Popup>
            </Marker>
        ))
        return (<>{items}</>)
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

                <Map 
                    center={position} 
                    zoom={zoom}
                    ref={mapRef}
                    onViewportChanged={onViewportChanged}
                    maxBounds={mapBounds}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <CircleMarker center={position}></CircleMarker>
                    <FeatureGroup>
                        <ClinikMarkersList facilities={facilities} />
                    </FeatureGroup>
                </Map>
            </main>
        </>
    );
});
