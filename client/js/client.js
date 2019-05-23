var Client = {};
Client.socket = io('http://localhost:55000');

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.updateBat = function(batNum){
    Client.socket.emit('updateBat', batNum);
};

Client.updateBall = function(ballNum){
    Client.socket.emit('updateBall', ballNum);
};

Client.addScore = function(playerNum){
    Client.socket.emit('addScore', playerNum);
};

Client.collidedWithBat = function(data){
    Client.socket.emit('ballCollidedWithBat', data);
};

Client.collidedWithWorld = function(data){
    Client.socket.emit('ballCollidedWithWorld', data);
};

Client.startGame = function(p1Bat, p2Bat, ball){
    Client.socket.emit('startGame', {p1Bat: p1Bat, p2Bat: p2Bat, ball: ball});
};

Client.sendMovePlayer = function(data){
    Client.socket.emit('sendMovePlayer', data);
};

Client.getSelectedBats = function(){
    Client.socket.emit('getSelectedBat');
};

Client.playerNumber = function(){
    Client.socket.emit('playerNumber');
};

Client.socket.on('connected', function(){
    console.log("You are connected");
    globalVars.isConnected = true;
});

Client.socket.on('playerNumber', function(num){
    globalVars.playerNumber = num;
});

Client.socket.on('selectedBat', function(bats){
    console.log("Recevied data, player1: " + bats.p1Bat + " player2: " + bats.p2Bat + " Ball: " + bats.ball);
    GameScreen.setPlayersBats(bats);
});

Client.socket.on('updateBat', function(batNum){
    console.log("Received bat update request");
    MainMenu.updateOpponentsBat(batNum);
});

Client.socket.on('addScore', function(data){
    GameScreen.addScoreToPlayer(data);
});

Client.socket.on('resetBall', function(){
    GameScreen.resetBallPos();
});

Client.socket.on('playersReady', function(){
    MainMenu.gameReady();
});

Client.socket.on('updateBall', function(ballNum){
    console.log("Received ball update request");
    MainMenu.updateBallColor(ballNum);
});

Client.socket.on('updateBallSpeed', function(data){
    GameScreen.updateBallSpeed(data);
});

Client.socket.on('movePlayer', function(data){
    GameScreen.movePlayer(data);
});

Client.socket.on('startGame', function(){
    MainMenu.startGameScreen();
});

Client.socket.on('playerDisconnected',function(){
    console.log("Player disconnected, game ended.");
    window.alert("Game ended. Searching for new game.");
    location.reload();
});

Client.socket.on('gameFull', function(){
    console.log("Recived Game Full.");
    globalVars.playerNumber = -1;
});

Client.socket.on('allplayers',function(data){
    console.log("socket All players");
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }
});