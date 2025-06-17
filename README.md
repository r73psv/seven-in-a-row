# seven-in-a-row
# 🧩 Семь в ряд — Connect Seven

Классическая игра "Семь в ряд" с поддержкой:
- Многопользовательской игры через WebSocket
- Режима против компьютера (с ИИ)
- Регистрации и профиля пользователя
- Полной мобильной адаптации
- Облачного хранения данных (MongoDB Atlas)

---

## 🔧 Технологии

- **Backend**: Python + Flask + SocketIO + MongoDB Atlas
- **Frontend**: React + Axios + SocketIO
- **ИИ**: Minimax с альфа-бета отсечением
- **Аутентификация**: JWT + Bcrypt

---

## 🚀 Как запустить

### Установка зависимостей

```bash
cd backend && pip install -r requirements.txt
cd ../frontend && npm install

Запуск сервера
cd backend && python app.py

Запуск фронтенда
cd frontend && npm start

