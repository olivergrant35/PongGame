const PORT = 55000;

var server = require('http').createServer();
var io = require('socket.io')(server);

var RoomID = 0;
var Rooms = [];

//Runs when connection from client to server is established. 
io.on('connection', function(client) {
    console.log("New user connected.");
    client.emit('connected');

    //TODO: Fix room issues, can get caught in a loop of disconnecting rooms on player leaving. 
    client.on('newplayer',function() {
        if(Rooms.length != 0){
            var spaceFound = false;
            for (let i = 0; i < Rooms.length; i++) {
                const room = Rooms[i];
                if(room.playerCount = 1){
                    client.join(room.id);
                    client.roomInfo = {
                        roomName: room.id,
                        playerID: 2
                    };
                    room.player2 = {
                        playerID: 2,
                        x: 750,
                        y: 300
                    }
                    room.playerCount++;
                    spaceFound = true;
                }
            }
            if(!spaceFound){
                createNewRoom();
                client.join(Rooms[Rooms.length - 1].id);
                client.roomInfo = {
                    roomName: Rooms[Rooms.length - 1].id,
                    playerID: 1
                };
                Rooms[Rooms.length - 1].player1 = {
                    playerID: 1,
                    x: 50,
                    y: 300,
                }
            }
        }else{
            createNewRoom();
            client.join(Rooms[0].id);            
            client.roomInfo = {
                roomName: Rooms[0].id,
                playerID: 1
            };
            Rooms[0].player1 = {
                playerID: 1,
                x: 50,
                y: 300,
            }
        }

        client.on('playerNumber', function(){
            client.emit('playerNumber', client.roomInfo.playerID);
        });

        client.on('sendMovePlayer', function(data){
            io.to(client.roomInfo.roomName).emit('movePlayer', data);
        });

        client.on('disconnect',function() {
            io.to(client.roomInfo.roomName).emit('playerDisconnected');
            Rooms.splice(client.roomInfo.roomName, 1);
            console.log('Player disconnected. Removing room: ' + client.roomInfo.roomName);
        });

        client.on('updateBat', function(batNum){
            console.log("Received bat update request.");
            client.broadcast.emit('updateBat', batNum);
        });

        client.on('updateBall', function(ballNum){
            console.log("Received ball update request.");
            client.broadcast.emit('updateBall', ballNum);
        });

        client.on('getSelectedBat', function(){
            var p1Bat = Rooms[client.roomInfo.roomName].player1.selectedBat;
            var p2Bat = Rooms[client.roomInfo.roomName].player2.selectedBat;
            var ball = Rooms[client.roomInfo.roomName].ball;
            client.emit('selectedBat', {p1Bat: p1Bat, p2Bat: p2Bat, ball: ball});
        });

        client.on('startGame', function(data){
            io.emit('startGame');
            console.log(data);
            Rooms[client.roomInfo.roomName].player1.selectedBat = data.p1Bat;
            Rooms[client.roomInfo.roomName].player2.selectedBat = data.p2Bat;
            Rooms[client.roomInfo.roomName].ball = data.ball;
        });
    });
});

server.listen(PORT, function(){
    console.log('Listening on ' + server.address().port);
});

function createNewRoom(){
    var room = {
        id: RoomID,
        playerCount: 1
    }
    Rooms.push(room);
    RoomID++;
}

