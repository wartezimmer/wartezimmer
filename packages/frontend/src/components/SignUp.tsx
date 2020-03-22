import { LeftOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { login } from "state/thunks/login";

import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export const SignUp = () => {
    const dispatch = useThunkDispatch();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    // const counter = useSelector((state: State) => state.example.counter);
    return (
        <>
            <header>
                <LeftOutlined onClick={() => dispatch(AppApi.back())} />
                <h1>Account Anlegen</h1>
                <div className="space"></div>
            </header>
            <main>
                <Form id="signup">
                    <Form.Item label={"E-Mail-Adresse"}>
                        <Input value={id} onChange={(e) => setId(e.target.value)} />
                    </Form.Item>
                    {/* oder
                    <Form.Item label={"Telefonnummer"}>
                    <Input />
                  </Form.Item> */}
                    <Form.Item label={"Passwort"}>
                        <Input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <Button className="login" onClick={() => dispatch(login(id, password))}>Registrieren</Button>
                </Form>
            </main>
        </>
    );
};
