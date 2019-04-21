class GameScreen extends Phaser.Scene{
    constructor(){
        super({key:"GameScreen"});
    }

    preload(){

    }

    create(){
        
        this.backToMenuButton = this.add.text(390, 560, 'X', {font: "40px"}).setInteractive().on('pointerdown', () => this.scene.start("Menu"));
    }

    update(delta){

    }
}