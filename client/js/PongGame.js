var GameScreen = {};

GameScreen.preload = function(){
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



GameScreen.create = function(){
    
};

GameScreen.update = function(){

};

GameScreen.exitGame = function(){
    //game.scene.start('MainMenu');
    //game.scene.remove('GameScreen');
    //TODO: Need to run Client.endGame(), so other player knows game is ended.
    //Or remove the option to go back to menu.
};