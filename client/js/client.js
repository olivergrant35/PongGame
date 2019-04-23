var Client = {};
Client.socket = io('http://localhost:55000');

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    console.log("New player");
    Client.socket.emit('newplayer');
};

Client.sendClick = function(x,y){
    console.log("Send Click");
  Client.socket.emit('click',{x:x,y:y});
};

Client.socket.on('newplayer',function(data){
    console.log("socket new player");
    Game.addNewPlayer(data.id,data.x,data.y);
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
    });
});