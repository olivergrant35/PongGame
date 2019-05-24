var LoadingScene = {};

LoadingScene.preload = function(){
    console.log("loading started");
};

LoadingScene.create = function(){
    this.add.text(270, 250, 'Connecting...', {font: "50px Impact"});
    this.add.text(270, 320, 'Please ensure server is running.', {font: "20px Impact"});

    Client.askNewPlayer();
    Client.playerNumber(); 
};

LoadingScene.update = function(){
    if(globalVars.isConnected && globalVars.playerNumber != 0){
        game.scene.start('MainMenu');
        game.scene.remove('Loading');
    }
};