const PORT = 55000;

var server = require('http').createServer();
var io = require('socket.io')(server);

//Runs when connection to server is established. 
io.on('connection', function(client) {
    console.log("Connection Received.");
    client.on('test', function() {
        console.log('test received');
    });
    
    client.on('newplayer',function() {
        console.log("new player request received.");
        if(server.PlayerID <= 2){
            client.player = {
                id: server.PlayerID,
                x: randomInt(100,400),
                y: randomInt(100,400)
            };
            PlayerID++;
            client.emit('allplayers',getAllPlayers());
            client.broadcast.emit('newplayer',client.player);
        }else{
            console.log("Player tried joining, game full.");
            client.emit('gameFull');
        }    

        client.on('click',function(data) {
            console.log('click to '+data.x+', '+data.y);
            client.player.x = data.x;
            client.player.y = data.y;
            io.emit('move',client.player);
        });

        client.on('disconnect',function() {
            io.emit('remove', client.player.id);
            console.log('disconnecting: ' + client.player.id);
        });

        client.on('getPlayersBat', function(player){
            console.log("getPlayerBat " + client.player.id);
        });
    });
    
});

server.listen(PORT, function(){
    console.log('Listening on ' + server.address().port);
});

server.PlayerID = 1;
server.player1SelectedBat;
server.player2SelectedBat;

function getAllPlayers(){
    console.log("getAllPlayers");
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

