import { LeftOutlined } from "@ant-design/icons";
import React from "react";

import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export const About = () => {
    const dispatch = useThunkDispatch();
    // const counter = useSelector((state: State) => state.example.counter);
    return (
        <>
            <header>
                <LeftOutlined className="back" onClick={() => dispatch(AppApi.back())} />
                <h1>So Funktioniert's</h1>
                <div className="space"></div>
            </header>
            <main>
            </main>
        </>
    );
};
