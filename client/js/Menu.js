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
        //Test to check if client is connected to server.
        this.input.keyboard.on('keyup_T', function(event){
            Client.sendTest();
        });

        Client.askNewPlayer();
        
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
        this.player1BatImage = this.add.image(138, 310, globalVars.bats[this.selectedBat]);
        this.add.text(92, 400, '<--', {font: "20px"}).setInteractive().on('pointerdown', () => this.selectPreviousBat());
        this.add.text(145, 400, '-->', {font: "20px"}).setInteractive().on('pointerdown', () => this.selectNextBat());

        //Right Side
        this.add.text(610, 150, 'Player 2', {font: "25px Impact"});
        this.add.text(608, 190, 'Bat Colour', {font: "20px Impact"});
        this.add.image(648, 310, 'bat1');

        //Ball colour
        this.add.text(355, 450, 'Ball Colour', {font: "20px Impact"});
        this.ballImage = this.add.image(400, 510, globalVars.balls[this.selectedBall]);
        this.add.text(350, 550, '<--', {font: "20px"}).setInteractive().on('pointerdown', () => this.selectPreviousBall());
        this.add.text(410, 550, '-->', {font: "20px"}).setInteractive().on('pointerdown', () => this.selectNextBall());

        this.playButton = this.add.text(365, 200, 'PLAY', {font:"40px Impact"}).setInteractive().on('pointerdown', () => this.startGameScreen());
        this.exitButton = this.add.text(368, 250, 'EXIT', {font:"40px Impact"}).setInteractive().on('pointerdown', () => window.location.relaod);
    }

    update(delta){

    }

    startGameScreen(){
        player1SelectedBat = this.selectedBat;
        this.scene.start("GameScreen");
    }

    selectNextBat(){
        if(this.selectedBat == 4){
            this.selectedBat = 0;
        }else{
            this.selectedBat++;
        }
        this.player1BatImage = this.add.image(138, 310, globalVars.bats[this.selectedBat]);
    }

    selectPreviousBat(){
        if(this.selectedBat == 0){
            this.selectedBat = 4;
        }else{
            this.selectedBat--;
        }
        this.player1BatImage = this.add.image(138, 310, globalVars.bats[this.selectedBat]);
    }

    selectNextBall(){
        if(this.selectedBall == 4){
            this.selectedBall = 0;
        }else{
            this.selectedBall++;
        }
        this.ballImage == this.add.image(400, 510, globalVars.balls[this.selectedBall]);
    }

    selectPreviousBall(){
        if(this.selectedBall == 0){
            this.selectedBall == 4;
        }else{
            this.selectedBall--;
        }
        this.ballImage == this.add.image(400, 510, globalVars.balls[this.selectedBall]);
    }

    gameFull(){
        window.alert("Game Full");
    }
}