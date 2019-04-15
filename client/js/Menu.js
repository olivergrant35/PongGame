class Menu extends Phaser.Scene{    
    constructor(){
        super({key:"Menu"});        
    }

    preload(){
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
    }

    create(){
        this.bats = ["bat1", "bat2", "bat3", "bat4", "bat5"];
        this.balls = ["ball1", "ball2", "ball3", "ball4", "ball5"];
        this.selectedBat = 0;
        this.selectedBall = 0;

        this.input.keyboard.on('keyup_P', function(event){
            var physicsImage = this.physics.add.image(this.ball.x, this.ball.y, 'ball1');
            physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100, 100), -300);
        }, this);

        //Title
        this.add.text(270, 10, 'Pong Game', {font: "60px Impact"});

        //Left Side
        this.add.text(100, 150, 'Player 1', {font: "25px Impact"});
        this.add.text(98, 190, 'Bat Colour', {font: "20px Impact"});
        this.add.image(138, 310, bats[selectedBat]);
        this.add.text(92, 400, '<--', {font: "20px"}).setInteractive().on('pointerdown', () => this.selectNextBat());
        this.add.text(145, 400, '-->', {font: "20px"});

        //Right Side
        this.add.text(610, 150, 'Player 2', {font: "25px Impact"});
        this.add.text(608, 190, 'Bat Colour', {font: "20px Impact"});
        this.add.image(648, 310, 'bat1');

        this.add.text(270, 10, 'Pong Game', {font: "60px Impact"});
        this.add.text(270, 10, 'Pong Game', {font: "60px Impact"});
        this.add.text(270, 10, 'Pong Game', {font: "60px Impact"});
        this.playButton = this.add.text(365, 200, 'PLAY', {font:"40px Impact"}).setInteractive().on('pointerdown', () => this.scene.start("GameScreen"));
        this.exitButton = this.add.text(368, 250, 'EXIT', {font:"40px Impact"}).setInteractive().on('pointerdown', () => window.location.relaod);        

        //Decide to use this or not.
        // var tween = this.tweens.add({
        //     targets: this.playButton,
        //     x:360,
        //     y:200,
        //     duration:2000,
        //     ease:"Elastic",
        //     easeParams:[1.5, 0.5],
        //     delay:1000
        // },this);
        
        // this.add.image(200, 200, 'ball2');
        // this.add.image(300, 300, 'ball3');
        // this.add.image(400, 400, 'ball4');
        // this.add.image(500, 500, 'ball5');

        // this.add.image(200, 100, 'bat1');
        // this.add.image(300, 200, 'bat2');
        // this.add.image(400, 300, 'bat3');
        // this.add.image(500, 400, 'bat4');
        // this.add.image(600, 500, 'bat5');
    }

    selectNextBat(){
        
    }

    update(delta){

    }
}