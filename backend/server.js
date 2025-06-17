const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(express.json());

// === DB Connect (MongoDB) ===
mongoose.connect("mongodb://localhost/seveninarow", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const User = require("./models/User");

// === Routes ===
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Пользователь создан" });
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Неверный логин или пароль" });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, "secret_key", { expiresIn: "1h" });
    res.json({ token });
});

// === Socket.IO ===
io.on("connection", (socket) => {
    console.log("Клиент подключён:", socket.id);

    socket.on("join_room", (room) => {
        socket.join(room);
        socket.emit("message", `Вы присоединились к комнате: ${room}`);
    });

    socket.on("make_move", (data) => {
        socket.to(data.room).emit("opponent_move", data);
    });

    socket.on("disconnect", () => {
        console.log("Клиент отключён:", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Сервер запущен на порту 5000");
});
