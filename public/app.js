// public/app.js
const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');
const ws = new WebSocket(`ws://${window.location.host}`);

ws.onmessage = (event) => {
    // Read the message as text
    const message = event.data;
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chat.appendChild(messageElement);
    chat.scrollTop = chat.scrollHeight;
};

function sendMessage() {
    if (messageInput.value.trim() !== '') {
        ws.send(messageInput.value);
        messageInput.value = '';
    }
}

// Send message when pressing enter and add new line with shift+enter
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        sendMessage();
    }
});
