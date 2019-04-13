class Menu extends Phaser.Scene{
    constructor(){
        super({key:"Menu"});
    }

    preload(){
        this.load.image('ball1', 'assets/ball1.png');
        // this.load.image('ball2', 'assets/ball2.jpg');
        // this.load.image('ball3', 'assets/ball3.jpg');
        // this.load.image('ball4', 'assets/ball4.jpg');
        // this.load.image('ball5', 'assets/ball5.jpg');
        this.load.image('bat1', 'assets/bat1.png');
        // this.load.image('bat2', 'assets/bat2.jpg');
        // this.load.image('bat3', 'assets/bat3.jpg');
        // this.load.image('bat4', 'assets/bat4.jpg');
        // this.load.image('bat5', 'assets/bat5.jpg');
    }

    create(){
        this.ball = this.add.image(400, 300, 'ball1');
        this.player1 = this.add.image(50, 300, 'bat1');
        this.player2 = this.add.image(750, 300, 'bat1');

        this.input.keyboard.on('Keyup_D', function(event){
            this.player1.x += 10;
        });
    }
}