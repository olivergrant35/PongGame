class GameScreen extends Phaser.Scene{
    constructor(){
        super({key:"GameScreen"});
    }

    create(){
        this.text = this.add.text(0, 0, "Welcome to GameScreen", {font: "40px Impact"});
        this.backToMenuButton = this.add.text(390, 550, 'X', {font: "50px"}).setInteractive().on('pointerdown', () => this.scene.start("Menu"));
    }
}