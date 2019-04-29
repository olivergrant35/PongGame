var Client = {};
Client.socket = io('http://localhost:55000');

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.updateBat = function(batNum){
    Client.socket.emit('updateBat', batNum);
};

Client.updateBall = function(ballNum){
    Client.socket.emit('updateBall', ballNum);
};

Client.startGame = function(p1Bat, p2Bat){
    Client.socket.emit('startGame', {p1Bat: p1Bat, p2Bat: p2Bat});
};

Client.setSelectedBat = function(batNum){
    Client.socket.emit('setSelectedBat', batNum);
}

Client.sendClick = function(x,y){
    console.log("Send Click");
    Client.socket.emit('click',{x:x,y:y});
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

Client.socket.on('newplayer',function(data){
    console.log("socket new player");
    Game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('updateBat', function(batNum){
    console.log("Received bat update request");
    MainMenu.updateOpponentsBat(batNum);
});

Client.socket.on('updateBall', function(ballNum){
    console.log("Received ball update request");
    MainMenu.updateBallColor(ballNum);
});

Client.socket.on('startGame', function(data){
    console.log(data.p1Bat);
    console.log(data.p2Bat);
    globalVars.player1SelectedBat = data.p1Bat;
    globalVars.player2SelectedBat = data.p2Bat;
    MainMenu.startGameScreen();
});

Client.socket.on('allplayers',function(data){
    console.log("socket All players");
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('move',function(data){
        console.log("socket move");
        Game.movePlayer(data.id,data.x,data.y);
    });

    Client.socket.on('remove',function(id){
        console.log("socket Remove");
        Game.removePlayer(id);
    });

    Client.socket.on('gameFull', function(){
        console.log("Recived Game Full.");
        globalVars.playerNumber = -1;        
    });
});