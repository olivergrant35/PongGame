var config = {
    type:Phaser.AUTO,
    width:800,
    height:600,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y: 200}
        }
    },
    scene: [Menu, GameScreen]
};

var Game = new Phaser.Game(config);



//Original code given.

// var Game = {};

// Game.init = function(){
//     game.stage.disableVisibilityChange = true;
// };

// Game.preload = function() {
//     game.load.image('sprite', 'assets/coin.png');
// };

// Game.create = function(){
//     Game.playerMap = {};
//     var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
//     testKey.onDown.add(Client.sendTest, this);
    
//     game.input.onTap.add(Game.getCoordinates, this);
    
//     Client.askNewPlayer();
// };

// Game.getCoordinates = function(pointer){
//     Client.sendClick(pointer.worldX,pointer.worldY);
// };

// Game.addNewPlayer = function(id,x,y){
//     Game.playerMap[id] = game.add.sprite(x,y,'sprite');
// };

// Game.movePlayer = function(id,x,y){
//     var player = Game.playerMap[id];
//     var distance = Phaser.Math.distance(player.x,player.y,x,y);
//     var tween = game.add.tween(player);
//     var duration = distance*10;
//     tween.to({x:x,y:y}, duration);
//     tween.start();
// };

// Game.removePlayer = function(id){
//     Game.playerMap[id].destroy();
//     delete Game.playerMap[id];
// };