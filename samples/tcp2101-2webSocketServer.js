var net = require('net');

// define your websocket2serial.js server here
var WebSocketClient = require('ws')
  , ws = new WebSocketClient('ws://192.168.0.5:8081') ;

// host IP and port you want to listen for rquests on
var HOST = '192.168.0.5';
var PORT = 2101;

var connections = new Array;          // list of socket connections to the server

var server = net.createServer();
server.listen(PORT, HOST);
console.log('Server listening');

function showWebSocketOpen() {
  console.log('Socket Open');
}

function sendSocketMessage(data) {
  console.log('[' + Date.now() + '] < ' + data);
  ws.send(data);
}

function showWebSocketClose() {
  console.log('port closed.');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}

function sendToNet(message) {
  console.log('[' + Date.now() + '] > ' + message);

  // broadcast to all tcp clients

  if (connections.length > 0) {
    broadcast(message);
  }

}

function handleConnection(client) {
  console.log("New Connection"); // you have a new client
  connections.push(client); // add this client to the connections array

  client.on('data', sendSocketMessage); // when a client sends a message,

  client.on('close', function() { // when a client closes its connection
    console.log("connection closed"); // print it out
    var position = connections.indexOf(client); // get the client's position in the array
    connections.splice(position, 1); // and delete it from the array
  });
}

// This function broadcasts messages to all server clients
function broadcast(message) {
  for (myConnection in connections) {   // iterate over the array of connections
   connections[myConnection].write(message + '\r\n'); // send the data to each connection
  }
}

ws.on('open', showWebSocketOpen);
ws.on('message', sendToNet);
ws.on('error', showError);
ws.on('close', showWebSocketClose);
server.on('connection', handleConnection);
