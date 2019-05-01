const PORT = 55000;

var server = require('http').createServer();
var io = require('socket.io')(server);

var PlayerID = 1;
var RoomID = 1;

//Runs when connection to server is established. 
io.on('connection', function(client) {
    client.emit('connected');
    client.on('test', function() {
        console.log('test received');
    });
    
    client.on('newplayer',function() {
        console.log("New player request received.");
        if(PlayerID <= 2){
            client.player = {
                id: PlayerID,
                room: RoomID
            };
            PlayerID++;
            // client.emit('allplayers',getAllPlayers());
            // client.broadcast.emit('newplayer',client.player);
        }else{
            RoomID += 1;
            //TODO: Instead of game full, create new room. 
            console.log("Player tried joining, game full.");
            client.emit('gameFull');
        }

        client.on('playerNumber', function(){
            if(client.player == null){
                client.emit('playerNumber', -1);
            }else{
                client.emit('playerNumber', client.player.id);   
            }            
        });

        client.on('click',function(data) {
            console.log('click to '+data.x+', '+data.y);
            client.player.x = data.x;
            client.player.y = data.y;
            io.emit('move',client.player);
        });

        client.on('disconnect',function() {
            io.emit('remove', client.player.id);
            PlayerID--;
            console.log('disconnecting: ' + client.player.id);
        });

        // client.on('setSelectedBat', function(batNum){
        //     client.player.selectedBat = batNum;
        // });

        client.on('updateBat', function(batNum){
            console.log("Received bat update request.");
            client.broadcast.emit('updateBat', batNum);
        });

        client.on('updateBall', function(ballNum){
            console.log("Received ball update request.");
            client.broadcast.emit('updateBall', ballNum);
        });

        client.on('getSelectedBat', function(){
            var p1Bat;
            var p2Bat;
            p1Bat = client.player.selectedBat;
            for (let i = 0; i < io.sockets.connected.length; i++) {
                const player = io.sockets.connected[i];
                if(player.id == (client.player.id+1) && player.room == client.player.room){
                    p2Bat = player.selectedBat;                    
                }    
            }
            client.emit('selectedBat', {p1Bat: p1Bat, p2Bat: p2Bat});
        });

        client.on('startGame', function(data){
            io.emit('startGame');
            client.player.selectedBat = data.p1Bat;
            for (let i = 0; i < io.sockets.connected.length; i++) {
                const player = io.sockets.connected[i];
                if(player.id == (client.player.id+1) && player.room == client.player.room){
                    player.selectedBat = data.p2Bat;
                }
            }
        });
    });
});

server.listen(PORT, function(){
    console.log('Listening on ' + server.address().port);
});

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

