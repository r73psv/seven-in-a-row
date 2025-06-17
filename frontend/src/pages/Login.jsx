import React, { useState } from "react";
import { login } from "../services/api";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await login({ username, password });
            localStorage.setItem("token", res.data.token);
            onLogin();
        } catch (e) {
            alert("Ошибка входа");
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Логин"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль"/>
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
}
export default Login;
