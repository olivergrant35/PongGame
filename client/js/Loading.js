var LoadingScene = {};

LoadingScene.preload = function(){
    console.log("loading started");
    this.fullMessageDisplayed = false;
};

LoadingScene.create = function(){
    this.add.text(270, 250, 'Connecting...', {font: "50px Impact"});
    this.add.text(270, 320, 'Please ensure server is running.', {font: "20px Impact"});

    Client.askNewPlayer();
    Client.playerNumber();
};

LoadingScene.update = function(){
    if(globalVars.isConnected && globalVars.playerNumber == 1 || globalVars.playerNumber == 2){
        game.scene.start('MainMenu');
        game.scene.remove('Loading');
    }else if(globalVars.isConnected && globalVars.playerNumber == -1 && this.fullMessageDisplayed == false){
        this.fullMessageDisplayed = true;
        window.alert("Game currently full. Please wait or try again later.");
    }
};