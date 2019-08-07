import {EventEmitter} from 'events';

// Socket class to construct and provide methods for WebSocket connections.
class Socket {
    constructor(ws = new WebSocket(), ee = new EventEmitter()) {
        this.ws = ws;
        this.ee = ee;
        // Attach message function as event listener for incoming websocket messages.
        ws.onmessage = this.message.bind(this);
        // Attach open function tas event listener on websocket connections.
        ws.onopen = this.open.bind(this);
        // Attach close function as listener on websocket disconnections.
        ws.onclose = this.close.bind(this);
        // Attach error function as listener on websocket errors.
        ws.onerror = this.error.bind(this);
    };

    // Adds a function as an event consumer/listener.
    on(name, fn) {
        this.ee.on(name, fn);
    };

    // Removes a function as an event consumer/listener.
    off(name, fn) {
        this.ee.removeListener(name, fn);
    };

    // Handles a connection to a websocket.
    open() {
        this.ee.emit('connect');
    };

    // close to handles a disconnection from a websocket.
    close() {
        this.ee.emit('disconnect');
    };

    // error handles an error on a websocket.
    error(e) {
        console.log("websocket error: ", e);
    }

    // emit sends a message on a websocket.
    emit(name, data) {
        const message = JSON.stringify({name, data});
        this.ws.send(message);
    }

    // message handles an incoming message and forwards it to an event listener.
    message(e) {
        try {
            const message = JSON.parse(e.data);
            this.ee.emit(message.name, message.data);
        }
        catch(err) {
            this.ee.emit('error', err);
            console.log(Date().toString() + ": ", err);
        }
    }
}

export default Socket;
