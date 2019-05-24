const PORT = 55000;

var server = require('http').createServer();
var io = require('socket.io')(server);

var RoomID = 0;
var Rooms = [];
var ballSpeed = 6;

//Runs when connection from client to server is established. 
io.on('connection', function(client) {
    console.log("New user connected.");
    client.emit('connected');

    //TODO: Fix room issues, can get caught in a loop of disconnecting rooms on player leaving. 
    client.on('newplayer',function() {
        if(Rooms.length != 0){
            console.log("Rooms found, checking if space.");
            var spaceFound = false;
            for (let i = 0; i < Rooms.length; i++) {
                const room = Rooms[i];
                if(room.playerCount == 1){
                    console.log("Space found, adding client to room.");
                    client.join(room.id);
                    client.roomInfo = {
                        roomName: room.id,
                        playerID: 2
                    };
                    room.player2 = {
                        playerID: 2,
                        x: 750,
                        y: 300,
                        score: 0
                    }
                    room.playerCount++;
                    spaceFound = true;
                    io.to(client.roomInfo.roomName).emit('playersReady');
                }
            }
            if(!spaceFound){
                console.log("No space found, putting client in new room.");
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
                    score: 0
                }
            }
        }else{
            console.log("No rooms found, creating new room.");
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
                score: 0
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

        client.on('updateBat', function(data){
            console.log("Received bat update request.");
            io.to(client.roomInfo.roomName).emit('updateBat', data);
        });

        client.on('updateBall', function(ballNum){
            console.log("Received ball update request.");
            io.to(client.roomInfo.roomName).emit('updateBall', ballNum);
        });

        client.on('getSelectedBat', function(){
            var p1Bat = Rooms[client.roomInfo.roomName].player1.selectedBat;
            var p2Bat = Rooms[client.roomInfo.roomName].player2.selectedBat;
            var ball = Rooms[client.roomInfo.roomName].ball;
            io.to(client.roomInfo.roomName).emit('selectedBat', {p1Bat: p1Bat, p2Bat: p2Bat, ball: ball});
        });

        client.on('startGame', function(data){
            io.to(client.roomInfo.roomName).emit('startGame');
            console.log(data);
            Rooms[client.roomInfo.roomName].player1.selectedBat = data.p1Bat;
            Rooms[client.roomInfo.roomName].player2.selectedBat = data.p2Bat;
            Rooms[client.roomInfo.roomName].ball = data.ball;
        });
        
        client.on('addScore', function(playerNum){
            var room = Rooms[client.roomInfo.roomName];
            if(playerNum == 1){                
                room.player1.score++;
                console.log("player 1 score after add: " + room.player1.score);
                io.to(client.roomInfo.roomName).emit('addScore', {playerNumber: playerNum, score: room.player1.score});
                io.to(client.roomInfo.roomName).emit('updateBallSpeed', {xSpeed: -ballSpeed, ySpeed: 0, sound: false});
                io.to(client.roomInfo.roomName).emit('resetBall');
            }else{
                room.player2.score++;
                io.to(client.roomInfo.roomName).emit('addScore', {playerNumber: playerNum, score: room.player2.score});
                io.to(client.roomInfo.roomName).emit('updateBallSpeed', {xSpeed: ballSpeed, ySpeed: 0, sound: false});
                io.to(client.roomInfo.roomName).emit('resetBall');
            }
        });

        client.on('ballCollidedWithBat', function(data){
            var xS = -data.xSpeed;
            var yS = randomNumber();
            io.to(client.roomInfo.roomName).emit('updateBallSpeed', {xSpeed: xS, ySpeed: yS, sound: true});
        });

        client.on('ballCollidedWithWorld', function(data){
            io.to(client.roomInfo.roomName).emit('updateBallSpeed', {xSpeed: data.xSpeed, ySpeed: -data.ySpeed, sound:true});
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

function randomNumber(){
    var num = Math.floor(Math.random() * 7);
    num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    return num;
}

