import { List } from "antd";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export const MapSearchResultList = () => {
    const dispatch = useThunkDispatch();
    const searchResult = useSelector((state: State) => state.app.currentSearchResult);
    const scroll = useRef(null) as any;
    const halfWay = useRef(null) as any;

    if (searchResult === null || !searchResult.length) {
        return null;
    }
    useEffect(() => {
        if (halfWay != undefined) {
            scroll.current.scrollTo(0, halfWay.current.offsetTop);
        }
    });
    return (
        <>
            <div ref={scroll} className="results">
                <div className="top"></div>
                <div ref={halfWay} className="nothing"></div>
                <List className="map-results">
                    <div className="pill"></div>
                    {searchResult.map((r, n) => (
                        <List.Item
                            onClick={() => {
                                dispatch(AppApi.setCurrentFacility(r));
                            }}
                            key={`searchResult${n}`}
                        >
                            <List.Item.Meta title={<a>{r.name}</a>} description={`${r.address_street}`} />
                            {/* <div>Todo: Auslastung</div> */}
                        </List.Item>
                    ))}
                </List>
            </div>
        </>
    );
};
