from flask import Flask, request, jsonify
from flask_cors import CORS
from models.user import create_user, find_user
from utils.auth import generate_token, verify_token
from flask_socketio import SocketIO, emit
import bcrypt
import socketio

app = Flask(__name__)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

ROWS = 9
COLS = 11
GAMES = {}

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    result = create_user(username, hashed.decode('utf-8'))

    if not result:
        return jsonify({'error': 'User already exists'}), 400

    return jsonify({'message': 'User created'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = find_user(username)
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({'error': 'Invalid credentials'}), 401

    token = generate_token(username)
    return jsonify({'token': token})

@socketio.on('connect')
def handle_connect():
    print("Client connected")

@socketio.on('join_room')
def handle_join(data):
    room = data.get('room')
    join_room(room)
    emit('message', {'text': f'Joined room {room}'}, room=room)

@socketio.on('make_move')
def handle_move(data):
    room = data.get('room')
    col = data.get('column')
    emit('opponent_move', {'column': col}, room=room)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
