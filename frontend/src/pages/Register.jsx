import React, { useState } from "react";
import { register } from "../services/api";

function Register({ onRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const res = await register({ username, password });
            alert("Регистрация успешна!");
            onRegister();
        } catch (e) {
            alert("Ошибка регистрации");
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Логин"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль"/>
            <button onClick={handleRegister}>Зарегистрироваться</button>
        </div>
    );
}
export default Register;
