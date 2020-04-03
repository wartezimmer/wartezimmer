import { Button, Input } from "antd";
import React, { useEffect, createRef, useState } from "react";
import { withSnackbar } from "notistack";
import { SearchOutlined, LinkOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { fetchFacilities } from "state/thunks/fetchFacilities";
import { fetchFacilitiesInArea } from "state/thunks/fetchFacilitiesInArea";
import { State } from "../state";
import { AppApi, MapArea, Facility } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import L, { latLngBounds } from "leaflet";
import { Map, TileLayer, Marker, Tooltip, CircleMarker, Viewport, FeatureGroup, Popup } from "react-leaflet";
// import { SearchResultList } from "./SearchResultList";
import { MapSearchResultList } from "./MapSearchResultList";
import { hasGeolocation, getCurrentPosition } from "../geolocation";

function areaQueryFromBounds(bounds): MapArea {
    const center = bounds.getCenter();
    const northEast = bounds.getNorthEast();

    return {
        celat: center.lat,
        celng: center.lng,
        nelat: northEast.lat,
        nelng: northEast.lng,
    };
}

let zoomLevelNotification = 0;
const MIN_ZOOM_FOR_FETCH = 10;
let hasInitialPosition = false;

export const Search = withSnackbar(({ enqueueSnackbar, closeSnackbar }) => {
    const dispatch = useThunkDispatch();
    const searchTerm = useSelector((state: State) => state.app.currentSearchTerm);
    const position = useSelector((state: State) => state.app.currentPosition);
    const facilities = useSelector((state: State) => state.app.facilities);
    const searchResult = useSelector((state: State) => state.app.currentSearchResult);
    const stateViewport = useSelector((state: State) => state.app.viewport);
    const allowedLocation = useSelector((state: State) => state.app.userAllowedLocation);
    const mapRef = createRef<Map>();
    const [bounds, setBounds] = useState(null);
    
    // Bound to germany for the time being
    const southWest = L.latLng(43.27103747280261, 2.3730468750000004);
    const northEast = L.latLng(56.47462805805594, 17.885742187500004);
    const maxBounds = L.latLngBounds(southWest, northEast);

    const showZoomLevelNotification = () => {
        if (!zoomLevelNotification) {
            const key = enqueueSnackbar(`Gib einen Suchbegriff ein oder zoom rein um Einrichtungen anzuzeigen.`, {
                persist: true,
            });
            zoomLevelNotification = key as any;
        }
    };

    const closeZoomlevelNotification = () => {
        closeSnackbar(zoomLevelNotification);
        zoomLevelNotification = 0;
    }

    useEffect(() => {
        const map = mapRef.current;
        map.leafletElement.setMinZoom(6);
        const bounds = map.leafletElement.getBounds();
        dispatch(AppApi.setCurrentArea(areaQueryFromBounds(bounds)));

        // TODO: setup position watcher for periodic updates
        if (hasGeolocation && allowedLocation && !hasInitialPosition) {
            hasInitialPosition = true;
            const positionPendingSnackbar = enqueueSnackbar("Versuche deine momentane Position zu finden...", {
                persist: true,
                variant: "info",
            });

            getCurrentPosition(
                async (pos) => {
                    closeSnackbar(positionPendingSnackbar);
                    enqueueSnackbar("Position gefunden!", {
                        variant: "success",
                        autoHideDuration: 3000,
                    });
                    const crd = pos.coords;
                    dispatch(AppApi.setCurrentPosition([crd.latitude, crd.longitude]));
                    // TODO: consolidate zoom and center to viewport in state
                    await dispatch(AppApi.setViewport({
                        center: [crd.latitude, crd.longitude],
                        zoom: 11,
                    }));
                    const newBounds = map.leafletElement.getBounds();
                    await dispatch(AppApi.setCurrentArea(areaQueryFromBounds(newBounds)));
                    dispatch(fetchFacilitiesInArea());
                },
                (err) => {
                    closeSnackbar(positionPendingSnackbar);
                    enqueueSnackbar(`Position Fehler: ${err.message} (${err.code})`, {
                        variant: "error",
                        autoHideDuration: 7000,
                    });

                    // TODO: Handle err.code === 1, user denied location
                    if (err.code === 1) {
                        dispatch(AppApi.setUserAllowedLocation(false));
                    }
                },
            );
        } else {
            if (stateViewport.zoom >= MIN_ZOOM_FOR_FETCH) {
                dispatch(fetchFacilitiesInArea());
            } else if (!searchTerm) {
                showZoomLevelNotification();
            }
        }

        return () => {
            closeZoomlevelNotification()
        }
    }, []);

    async function onSearch() {
        if (searchTerm.length < 3) {
            enqueueSnackbar("Bitte geben Sie mindestens 3 Zeichen ein", {
                variant: "info",
            });
            return;
        }

        const response = await dispatch(fetchFacilities());

        if (response.status === "error" && response.code === "no_query") {
            dispatch(AppApi.setCurrentSearchResult([]));
            enqueueSnackbar("Bitte geben Sie einen Suchbegriff ein", {
                variant: "info",
            });
        } else if (response.status === "error") {
            enqueueSnackbar(`Fehler: ${response.code}`, {
                variant: "error",
                autoHideDuration: 7000,
            });
        } else if (response.result.length === 0) {
            enqueueSnackbar(`Leider nichts gefunden :(`);
        } else {
            setTimeout(() => {
                setBounds(latLngBounds(response.result.map((result) => [result.y, result.x])));
            }, 250);
        }
    }

    const onViewportChanged = async (viewport: Viewport) => {
        const map = mapRef.current;
        
        dispatch(AppApi.setViewport(viewport));
        if (viewport.zoom < MIN_ZOOM_FOR_FETCH || searchTerm.length !== 0) {
            return;
        }
        
        // TODO: do not trigger a refetch if viewport was only changed slightly (adjustable threshold),
        // for example by clicking a marker and moving the viewport minimally,
        if (map) {
            const bounds = map.leafletElement.getBounds();
            dispatch(AppApi.setCurrentArea(areaQueryFromBounds(bounds)));
            dispatch(fetchFacilitiesInArea());
        }
    };

    const onZoomEnd = (e) => {
        const map = mapRef.current;

        if (searchTerm.length !== 0) {
            return;
        }

        if (e.target._zoom < MIN_ZOOM_FOR_FETCH) {
            dispatch(AppApi.setFacilities([]));
            showZoomLevelNotification();
            return;
        }
        if (map) {
            const bounds = map.leafletElement.getBounds();
            dispatch(AppApi.setCurrentArea(areaQueryFromBounds(bounds)));
            dispatch(fetchFacilitiesInArea());
        }
        closeZoomlevelNotification();
    };

    const TooltipMarker = ({ facility }) => {
        const { id, x, y, name } = facility;
        return (
            <Marker
                key={id}
                position={[y, x]}
                title={name}
                onClick={() => {
                    dispatch(AppApi.setCurrentFacility(facility));
                }}
            >
                <Tooltip direction="top" offset={[0, -15]} opacity={1} permanent>
                    {name}
                </Tooltip>
            </Marker>
        );
    }

    const PopupMarker = ({ facility }) => {
        const { id, x, y, name } = facility;
        return (
            <Marker
                key={id}
                position={[y, x]}
                title={facility.name}
            >
                <Popup autoPan={false}>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            dispatch(AppApi.setCurrentFacility(facility));
                        }}
                    >
                        <LinkOutlined />
                        &nbsp;{name}
                    </div>
                </Popup>
            </Marker>
        );
    }

    const ClinicMarkersList = ({ facilities }: { facilities: Array<Facility> }) => {
        if (stateViewport.zoom < MIN_ZOOM_FOR_FETCH) {
            return null
        }
        let items
        if (facilities.length <= 15 && stateViewport.zoom > 15) {
            items = facilities.map((facility: Facility) => (<TooltipMarker key={facility.id} facility={facility} />));
        } else {
            items = facilities.map((facility: Facility) => (<PopupMarker key={facility.id} facility={facility} />));
        }

        return <>{items}</>;
    };

    const UserPosition = ({ center }) => (center ? <CircleMarker center={center}></CircleMarker> : null);

    return (
        <>
            <main id="search">
                <div className="head">
                    <Input
                        allowClear
                        placeholder="Meine Einrichtung finden"
                        value={searchTerm}
                        onChange={(e) => {
                            if (e.target.value.length === 0) {
                                if (mapRef.current) {
                                    const newBounds = mapRef.current.leafletElement.getBounds();
                                    dispatch(AppApi.setCurrentArea(areaQueryFromBounds(newBounds)));
                                }
                                dispatch(AppApi.setCurrentSearchResult([]));
                                if (stateViewport.zoom >= MIN_ZOOM_FOR_FETCH) {
                                    dispatch(fetchFacilitiesInArea());
                                } else {
                                    dispatch(AppApi.setViewport({
                                        zoom: MIN_ZOOM_FOR_FETCH,
                                        center: bounds ? (bounds as any).getCenter() : null,
                                    }));
                                }
                                dispatch(AppApi.setCurrentSearchTerm(""));
                                return;
                            }
                            if (zoomLevelNotification) {
                                closeSnackbar(zoomLevelNotification);
                                zoomLevelNotification = 0;
                            }
                            setBounds(null);
                            dispatch(AppApi.setCurrentSearchTerm(e.target.value));
                        }}
                        onPressEnter={onSearch}
                    />
                    <Button className="primary-red" onClick={onSearch} icon={<SearchOutlined />} />
                </div>
                {/* <SearchResultList /> */}
                {/* TODO: Use map->whenReady to act on mapRef */}
                <Map
                    center={stateViewport.center}
                    zoom={stateViewport.zoom}
                    ref={mapRef}
                    onViewportChanged={onViewportChanged}
                    maxBounds={maxBounds}
                    bounds={bounds}
                    onZoomEnd={onZoomEnd}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=joXtRquTCPnw5ntPeKaS"
                        maxZoom="20"
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
