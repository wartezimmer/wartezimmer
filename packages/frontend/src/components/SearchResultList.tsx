import { List } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export const SearchResultList = () => {
    const dispatch = useThunkDispatch();
    const searchResult = useSelector((state: State) => state.app.currentSearchResult);
    
    if (searchResult === null || !searchResult.length) {
        return <div>Todo: no searchresult</div>;
    }
    
    return (
        <>
            <List>
                {searchResult.map((r, n) => (
                    <List.Item onClick={() => {
                        dispatch(AppApi.setCurrentFacility(r))
                    }} key={`searchResult${n}`}>
                        <List.Item.Meta
                            title={<a >{r.name}</a>}
                            description={`${r.address_street}`}
                        />
                        <div>Todo: Auslastung</div>
                    </List.Item>
                ))}
            </List>
        </>
    );
};
