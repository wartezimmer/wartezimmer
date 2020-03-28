import { Button, Input } from "antd";
import React, { useEffect, createRef, useState } from "react";
import { withSnackbar } from 'notistack';
import { SearchOutlined, LinkOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

import { fetchFacilities } from "state/thunks/fetchFacilities";
import { fetchFacilitiesInArea } from "state/thunks/fetchFacilitiesInArea";
import { State } from "../state";
import { AppApi, MapArea, Facility } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import L, { latLngBounds } from 'leaflet';
import { 
    Map, 
    TileLayer, 
    Marker, 
    CircleMarker,
    Viewport,
    FeatureGroup,
    Popup,
} from "react-leaflet";
// import { SearchResultList } from "./SearchResultList";
import { MapSearchResultList } from "./MapSearchResultList";
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

let zoomLevelNotification = 0;
const MIN_ZOOM_FOR_FETCH = 10;

export const Search = withSnackbar(({ enqueueSnackbar, closeSnackbar }) => {
    const dispatch = useThunkDispatch();
    const searchTerm = useSelector((state: State) => state.app.currentSearchTerm);
    const position = useSelector((state: State) => state.app.currentPosition);
    const facilities = useSelector((state: State) => state.app.facilities);
    const searchResult = useSelector((state: State) => state.app.currentSearchResult);
    const zoom = useSelector((state: State) => state.app.zoom);
    const center = useSelector((state: State) => state.app.center);
    const allowedLocation = useSelector((state: State) => state.app.userAllowedLocation);
    const mapRef = createRef<Map>()
    const [bounds, setBounds] = useState(null)
    
    // Bound to germany for the time being
    const southWest = L.latLng(46.27103747280261, 2.3730468750000004);
    const northEast = L.latLng(56.47462805805594, 17.885742187500004);
    const mapBounds = L.latLngBounds(southWest, northEast);
    
    const showZoomLevelNotification = () => {
        if (!zoomLevelNotification) {
            const key = enqueueSnackbar(`Gib einen Suchbegriff ein oder zoom rein um Einrichtungen anzuzeigen.`, {
                persist: true
            });
            zoomLevelNotification = (key as any)
        }
    }

    useEffect(() => {
        const map = mapRef.current;
        map.leafletElement.setMinZoom(6);
        const bounds = map.leafletElement.getBounds();
        dispatch(AppApi.setCurrentArea(areaQueryFromBounds(bounds)))

        // TODO: setup position watcher for periodic updates
        if (hasGeolocation && allowedLocation) {
            const positionPendingSnackbar = enqueueSnackbar('Versuche deine momentane Position zu finden...', { 
                persist: true,
                variant: 'info',
            });
            
            getCurrentPosition(async (pos) => {
                closeSnackbar(positionPendingSnackbar);
                enqueueSnackbar('Position gefunden!', { 
                    variant: 'success',
                    autoHideDuration: 3000,
                });
                const crd = pos.coords;
                await dispatch(AppApi.setZoom(12))
                await dispatch(AppApi.setCurrentPosition([crd.latitude, crd.longitude]))
                const newBounds = map.leafletElement.getBounds();
                await dispatch(AppApi.setCurrentArea(areaQueryFromBounds(newBounds)))
                if (zoom >= MIN_ZOOM_FOR_FETCH) {
                    dispatch(fetchFacilitiesInArea())
                } else if(!searchTerm) {
                    showZoomLevelNotification()
                }
            }, (err) => {
                closeSnackbar(positionPendingSnackbar);
                enqueueSnackbar(`Position Fehler: ${err.message} (${err.code})`, { 
                    variant: 'error',
                    autoHideDuration: 7000,
                });

                // TODO: Handle err.code === 1, user denied location
                if (err.code === 1) {
                    dispatch(AppApi.setUserAllowedLocation(false))
                } 
            })
        } else {
            if (zoom >= MIN_ZOOM_FOR_FETCH) {
                dispatch(fetchFacilitiesInArea())
            } else if(!searchTerm) {
                showZoomLevelNotification()
            }
        }
    }, [])

    async function onSearch() {
        if (searchTerm.length < 3) {
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
        } else {
            setTimeout(() => setBounds(latLngBounds(response.result.map((result) => [result.y, result.x]))), 100)
        }
    }

    const onViewportChanged = async (viewport: Viewport) => {
        dispatch(AppApi.setZoom(viewport.zoom))
        if (viewport.zoom < MIN_ZOOM_FOR_FETCH || searchTerm.length !== 0) {
            return
        }

        if (mapRef.current) {
            const map = mapRef.current
            const bounds = map.leafletElement.getBounds();
            dispatch(AppApi.setCurrentArea(areaQueryFromBounds(bounds)))
            dispatch(fetchFacilitiesInArea())
        }
    }

    const onZoomEnd = (e) => {
        if (searchTerm.length !== 0) {
            return
        }

        if (e.target._zoom < MIN_ZOOM_FOR_FETCH) {
            dispatch(AppApi.setFacilities([]));
            showZoomLevelNotification()
            return;
        }
        if (mapRef.current) {
            const map = mapRef.current
            const bounds = map.leafletElement.getBounds();
            dispatch(AppApi.setCurrentArea(areaQueryFromBounds(bounds)))
            dispatch(fetchFacilitiesInArea())
        }
        closeSnackbar(zoomLevelNotification)
        zoomLevelNotification = 0
    }

    const ClinicMarkersList = ({ facilities }: { facilities: Array<Facility> }) => {
        const items = facilities.map((facility: Facility) => {
            const { id, x, y, name } = facility
            return (
                <Marker key={id} position={[y, x]}>
                    <Popup>
                        <div style={{ cursor: "pointer" }} onClick={() => {
                            dispatch(AppApi.setCurrentFacility(facility))
                        }}>
                            <LinkOutlined />&nbsp;{name}
                        </div>
                    </Popup>
                </Marker>
            )
        })
        return (<>{items}</>)
    }

    const UserPosition = ({ center }) => center 
        ?  (<CircleMarker center={center}></CircleMarker>)
        : null

    return (
        <>
            <main id="search">
                <div className="head">
                    <Input allowClear placeholder="Meine Einrichtung finden" value={searchTerm} onChange={(e) => {
                        if (e.target.value.length === 0) {
                            if (mapRef.current) {
                                const newBounds = mapRef.current.leafletElement.getBounds();
                                dispatch(AppApi.setCurrentArea(areaQueryFromBounds(newBounds)))
                            }
                            dispatch(AppApi.setCurrentSearchResult([]))
                            if (zoom >= MIN_ZOOM_FOR_FETCH) {
                                dispatch(fetchFacilitiesInArea())
                            } else {
                                showZoomLevelNotification()
                            }
                            dispatch(AppApi.setCurrentSearchTerm(''));
                            return
                        }
                        if (zoomLevelNotification) {
                            closeSnackbar(zoomLevelNotification)
                            zoomLevelNotification = 0
                        }
                        setBounds(null)
                        dispatch(AppApi.setCurrentSearchTerm(e.target.value));
                    }} onPressEnter={onSearch}/>
                    <Button className="primary-red" onClick={onSearch} icon={<SearchOutlined />}/> 
                </div>
                {/* <SearchResultList /> */}

                <Map 
                    center={position || center} 
                    zoom={zoom}
                    ref={mapRef}
                    onViewportChanged={onViewportChanged}
                    maxBounds={mapBounds}
                    bounds={bounds}
                    onZoomEnd={onZoomEnd}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <UserPosition center={position} />
                    <FeatureGroup>
                        <ClinicMarkersList facilities={searchResult?.length ? searchResult : facilities} />
                    </FeatureGroup>
                </Map>

                <MapSearchResultList />
            </main>
        </>
    );
});
