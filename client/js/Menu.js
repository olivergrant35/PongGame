var MainMenu = {};

MainMenu.preload = function(){
    MainMenu.player1BatImage;
    MainMenu.player2BatImage;
    MainMenu.ballImage;
    MainMenu.selectedBat = 0;
    MainMenu.selectedBall = 0;
    this.load.image('ball1', 'assets/ball1.png');
    this.load.image('ball2', 'assets/ball2.png');
    this.load.image('ball3', 'assets/ball3.png');
    this.load.image('ball4', 'assets/ball4.png');
    this.load.image('ball5', 'assets/ball5.png');
    this.load.image('bat1', 'assets/bat1.png');
    this.load.image('bat2', 'assets/bat2.png');
    this.load.image('bat3', 'assets/bat3.png');
    this.load.image('bat4', 'assets/bat4.png');
    this.load.image('bat5', 'assets/bat5.png');
};

MainMenu.create = function(){
    console.log("Player number: " + globalVars.playerNumber);    
    //Title
    this.add.text(270, 10, 'Pong Game', {font: "60px Impact"});

    //Left Side
    this.add.text(100, 150, 'Player 1', {font: "25px Impact"});
    this.add.text(98, 190, 'Bat Colour', {font: "20px Impact"});
    MainMenu.player1BatImage = this.add.image(138, 310, globalVars.bats[0]);
    if(globalVars.playerNumber == 1){
        //Bat selectors.
        this.add.text(92, 400, '<--', {font: "20px"}).setInteractive().on('pointerdown', () => MainMenu.selectPreviousBat());
        this.add.text(145, 400, '-->', {font: "20px"}).setInteractive().on('pointerdown', () => MainMenu.selectNextBat());
        //Ball selectors.
        this.add.text(350, 550, '<--', {font: "20px"}).setInteractive().on('pointerdown', () => MainMenu.selectPreviousBall());
        this.add.text(410, 550, '-->', {font: "20px"}).setInteractive().on('pointerdown', () => MainMenu.selectNextBall());
        this.playButton = this.add.text(365, 200, 'PLAY', {font:"40px Impact"}).setInteractive().on('pointerdown', () => MainMenu.hostStartGame());
    }else if(globalVars.playerNumber == 2){
        //Bat selectors. 
        this.add.text(602, 400, '<--', {font: "20px"}).setInteractive().on('pointerdown', () => MainMenu.selectPreviousBat());
        this.add.text(655, 400, '-->', {font: "20px"}).setInteractive().on('pointerdown', () => MainMenu.selectNextBat());
    }

    //Right Side
    this.add.text(610, 150, 'Player 2', {font: "25px Impact"});
    this.add.text(608, 190, 'Bat Colour', {font: "20px Impact"});
    MainMenu.player2BatImage = this.add.image(648, 310, globalVars.bats[0]);

    //Ball colour
    this.add.text(355, 450, 'Ball Colour', {font: "20px Impact"});
    MainMenu.ballImage = this.add.image(400, 510, globalVars.balls[MainMenu.selectedBall]);

    this.exitButton = this.add.text(368, 250, 'EXIT', {font:"40px Impact"}).setInteractive().on('pointerdown', () => window.location.relaod);
};

MainMenu.update = function(){

};

MainMenu.hostStartGame = function(){
    var p1Bat = MainMenu.selectedBat;
    var p2Bat = globalVars.bats.indexOf(MainMenu.player2BatImage.texture.key);
    Client.startGame(globalVars.player1SelectedBat, globalVars.player2SelectedBat);    
};

MainMenu.startGameScreen = function(){
    game.scene.start('GameScreen');
    game.scene.remove('MainMenu');
};

MainMenu.selectNextBat = function(){
    if(MainMenu.selectedBat == 4){
        MainMenu.selectedBat = 0;
    }else{
        MainMenu.selectedBat++;
    }
    if(globalVars.playerNumber == 1){
        game.textures.setTexture(MainMenu.player1BatImage, globalVars.bats[MainMenu.selectedBat]);
    }else{
        game.textures.setTexture(MainMenu.player2BatImage, globalVars.bats[MainMenu.selectedBat]);
    }
    Client.updateBat(MainMenu.selectedBat);
};

MainMenu.selectPreviousBat = function(){
    if(MainMenu.selectedBat == 0){
        MainMenu.selectedBat = 4;
    }else{
        MainMenu.selectedBat--;
    }
    if(globalVars.playerNumber == 1){
        game.textures.setTexture(MainMenu.player1BatImage, globalVars.bats[MainMenu.selectedBat]);
    }else{
        game.textures.setTexture(MainMenu.player2BatImage, globalVars.bats[MainMenu.selectedBat]);
    }
    Client.updateBat(MainMenu.selectedBat);
};

MainMenu.selectNextBall = function(){
    if(MainMenu.selectedBall == 4){
        MainMenu.selectedBall = 0;
    }else{
        MainMenu.selectedBall++;
    }
    game.textures.setTexture(MainMenu.ballImage, globalVars.balls[MainMenu.selectedBall]);
    Client.updateBall(MainMenu.selectedBall);
};

MainMenu.selectPreviousBall = function(){
    if(MainMenu.selectedBall == 0){
        MainMenu.selectedBall = 4;
    }else{
        MainMenu.selectedBall--;
    }
    game.textures.setTexture(MainMenu.ballImage, globalVars.balls[MainMenu.selectedBall]);
    Client.updateBall(MainMenu.selectedBall);
};

MainMenu.updateOpponentsBat = function(batNum){
    if(globalVars.playerNumber == 1){
        game.textures.setTexture(MainMenu.player2BatImage, globalVars.bats[batNum]);
    }else{
        game.textures.setTexture(MainMenu.player1BatImage, globalVars.bats[batNum]);
    }
};

MainMenu.updateBallColor = function(ballNum){
    game.textures.setTexture(MainMenu.ballImage, globalVars.balls[ballNum]);
};