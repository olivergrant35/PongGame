var GameScreen = {};

GameScreen.preload = function(){
    //console.log(game.texture);

};

GameScreen.create = function(){
    //this.backToMenuButton = this.add.text(390, 560, 'X', {font: "40px"}).setInteractive().on('pointerdown', () => game.scene.start("Menu"));    
};

GameScreen.update = function(){

};

GameScreen.exitGame = function(){
    //game.scene.start('MainMenu');
    //game.scene.remove('GameScreen');
    //TODO: Need to run Client.endGame(), so other player knows game is ended.
    //Or remove the option to go back to menu.
};

GameScreen.loadData = function(data){

};


function getBatName(){

}