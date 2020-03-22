import { List } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { State } from "../state";
import { useThunkDispatch } from "../useThunkDispatch";

export const SearchResultList = () => {
    const dispatch = useThunkDispatch();
    const searchResult = useSelector((state: State) => state.app.currentSearchResult);
    if (searchResult === null) {
        return <div>Todo: no searchresult</div>;
    }
    return (
        <>
            <List>
                {searchResult.map((r, n) => (
                    <List.Item key={`searchResult${n}`}>
                        <List.Item.Meta
                            title={<a href="https://ant.design">{r.name}</a>}
                            description={`${r.street}`}
                        />
                    </List.Item>
                ))}
            </List>
        </>
    );
};
