import React from "react";

function Profile() {
    const token = localStorage.getItem("token");
    if (!token) {
        return <p>Вы не авторизованы</p>;
    }

    return (
        <div>
            <h2>Профиль</h2>
            <p>Добро пожаловать!</p>
        </div>
    );
}
export default Profile;
