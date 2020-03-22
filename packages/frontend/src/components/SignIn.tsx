import { Button, Form, Input } from "antd";
import React, { useState } from "react";

import { AppApi } from "../state/app";
import { register } from "../state/thunks/register";
import { useThunkDispatch } from "../useThunkDispatch";

export const SignIn = () => {
    const dispatch = useThunkDispatch();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    // const counter = useSelector((state: State) => state.example.counter);
    return (
        <>
            <header>Anmelden</header>
            <main>
                <Form.Item label={"E-Mail-Adresse"}>
                    <Input value={id} onChange={(e) => setId(e.target.value)} />
                </Form.Item>
                <Form.Item label={"Passwort"}>
                    <Input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                oder [Signin Facebook] [Signin Google]
                <Button onClick={() => dispatch(AppApi.back())}>Abbrechen</Button>
                <Button onClick={() => dispatch(register(id, password))}>Registrieren</Button>
                <hr/>
                <div className="ext-login">
                    <Button className="google" onClick={() => dispatch(ExampleApi.reset())}>Login with Google</Button>
                    <Button className="facebook" onClick={() => dispatch(ExampleApi.reset())}>Login with Facebook</Button>
                </div>
            </main>
        </>
    );
};
