import { List, Button } from "antd";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export const MapSearchResultList = () => {
    const dispatch = useThunkDispatch();
    const searchResult = useSelector((state: State) => state.app.currentSearchResult);
    const resultListHidden = useSelector((state: State) => state.app.resultListHidden);
    const scroll = useRef(null) as any;
    const halfWay = useRef(null) as any;

    
    useEffect(() => {
        if (searchResult === null || !searchResult.length) {
            return;
        }
        if (halfWay != undefined && halfWay.current != undefined) {
            const scrollElm = scroll.current as HTMLDivElement;
            scrollElm.scrollTo(0, halfWay.current.offsetTop);
            scrollElm.addEventListener("scroll", (e) => {
                if (scrollElm.scrollTop <= 0) {
                    dispatch(AppApi.setResultListHidden(true));
                }
            })
        }
    });


    if (searchResult === null || !searchResult.length) {
        return null;
    }

    if (resultListHidden) {
        return <>
            <div className="results-hidden">
                <Button onClick={() => {dispatch(AppApi.setResultListHidden(false))}}>Liste anzeigen</Button>
            </div>
        </>
    }

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
