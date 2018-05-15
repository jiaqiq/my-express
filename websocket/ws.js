var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
wss = new WebSocketServer({
    port: 8181
});
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        console.log('接收', message);
        // ws.send(`你好${message}`);
        var timesRun = 0;
        var interval = setInterval(function () {
            timesRun += 1;
            var rad = Math.random();
            ws.send(`服务端推送${rad}`);
            if (timesRun === 60) {
                clearInterval(interval);
            }
            //do whatever here..
        }, 1000);
    });
});