class GameScreen extends Phaser.Scene{
    constructor(){
        super({key:"GameScreen"});
    }

    //Don't think this is needed as assets are loaded in Menu Scene.
    preload(){

    }

    create(){
        this.backToMenuButton = this.add.text(390, 560, 'X', {font: "40px"}).setInteractive().on('pointerdown', () => this.scene.start("Menu"));
    }

    update(delta){
        
    }
}