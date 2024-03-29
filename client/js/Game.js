var config = {
    type:Phaser.AUTO,
    width:800,
    height:600,
    physics: {
        default: 'arcade'
    },
    scene: []
};

var game = new Phaser.Game(config);

game.scene.add('Loading', LoadingScene);
game.scene.add('MainMenu', MainMenu);
game.scene.add('GameScreen', GameScreen);
game.scene.start('Loading');