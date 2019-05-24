var GameScreen = {};

GameScreen.preload = function(){
    console.log("Preload Running.");
    //Load selected bats.
    Client.getSelectedBats();
    GameScreen.p1BatIndex;
    GameScreen.p2BatIndex;
    GameScreen.ballIndex;
    GameScreen.p1Bat;
    GameScreen.p2Bat;
    GameScreen.ball;
    GameScreen.playerSpeed = 4;
    GameScreen.player1Score;
    GameScreen.player2Score;
    GameScreen.ballParticles;
    GameScreen.emitter;
    GameScreen.pointSound;
    GameScreen.bounceSound;
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
    this.load.image('ball1Particle', 'assets/ball1Particle.png');
    this.load.image('ball2Particle', 'assets/ball2Particle.png');
    this.load.image('ball3Particle', 'assets/ball3Particle.png');
    this.load.image('ball4Particle', 'assets/ball4Particle.png');
    this.load.image('ball5Particle', 'assets/ball5Particle.png');
    this.load.image('bat1Particle', 'assets/bat1Particle.png');
    this.load.image('bat2Particle', 'assets/bat2Particle.png');
    this.load.image('bat3Particle', 'assets/bat3Particle.png');
    this.load.image('bat4Particle', 'assets/bat4Particle.png');
    this.load.image('bat5Particle', 'assets/bat5Particle.png');

    this.load.audio('point', 'assets/sounds/point.mp3');
    this.load.audio('bounce', 'assets/sounds/bounce2.mp3'); 
};

GameScreen.create = async function(){
    //sleep to allow server to set bats before continuing. 
    await sleep(500);
    console.log("Create Running.");
    //Need to get the location from server and update clients
    GameScreen.p1Bat = {
        image: this.physics.add.image(50, 300, globalVars.bats[GameScreen.p1BatIndex]),
        up: false,
        down: false
    };
    GameScreen.p2Bat = {
        image: this.physics.add.image(750, 300, globalVars.bats[GameScreen.p2BatIndex]),
        up: false,
        down: false
    };
    GameScreen.ball = {
        image: this.physics.add.image(400, 300, globalVars.balls[GameScreen.ballIndex]),
        xSpeed: 6,
        ySpeed: 0
    };

    this.physics.add.collider(GameScreen.p1Bat.image, GameScreen.ball.image, GameScreen.collided, null, this);
    this.physics.add.collider(GameScreen.p2Bat.image, GameScreen.ball.image, GameScreen.collided, null, this);

    GameScreen.ball.image.setCollideWorldBounds(true);

    GameScreen.ballParticles = this.add.particles(globalVars.balls[GameScreen.ballIndex] + "Particle");
    GameScreen.emitter = GameScreen.ballParticles.createEmitter({
        speed: {min: 100, max: 300},
        alpha: {start: 1, end: 0},
        quantity: {min: 50, max: 100},
        lifespan: 300,
        scale: {min: 0.7, max: 1},
        on: false
    });

    //Sounds
    GameScreen.pointSound = this.sound.add('point');
    GameScreen.bounceSound = this.sound.add('bounce');

    //Score text.
    GameScreen.player1Score = this.add.text(200, 10, '0', {font: '30px Impact'});
    GameScreen.player2Score = this.add.text(600, 10, '0', {font: '30px Impact'});
    
    //Game input for mobiles.
    //TODO: sort inputs.
    var pointer = this.input.activePointer;
    if(pointer.isDown){
        if(pointer.x < 200){
            //player1 move.
        }else if(pointer.x > 600){
            //player2 move. 
        }
    }

    //Movement controls for computers.
    this.input.keyboard.addKey('W').on('down', function(event){
        Client.sendMovePlayer({direction: 0, playerNumber: globalVars.playerNumber});
    });
    this.input.keyboard.addKey('S').on('down', function(event){
        Client.sendMovePlayer({direction: 1, playerNumber: globalVars.playerNumber});
    });
};

GameScreen.update = async function(){
    //Sleep to wait for create method to finish.
    await sleep(1000);
    if(GameScreen.p1Bat.up && GameScreen.p1Bat.image.y > 75){
        GameScreen.p1Bat.image.y -= GameScreen.playerSpeed;
    }
    if(GameScreen.p1Bat.down && GameScreen.p1Bat.image.y < 525){
        GameScreen.p1Bat.image.y += GameScreen.playerSpeed;
    }
    if(GameScreen.p2Bat.up && GameScreen.p2Bat.image.y > 75){
        GameScreen.p2Bat.image.y -= GameScreen.playerSpeed;
    }
    if(GameScreen.p2Bat.down && GameScreen.p2Bat.image.y < 525){
        GameScreen.p2Bat.image.y += GameScreen.playerSpeed;
    }

    //Ball hit left side - point to player 2. 
    if(globalVars.playerNumber == 1){
        if(GameScreen.ball.image.x <= 15){
            Client.addScore(2);
        }else if(GameScreen.ball.image.x >= 785){ //Ball hit right side - point to player 1.
            Client.addScore(1);
        }
    }

    //If ball hits top or bottom, send to server to update speeds for bounce.
    if(GameScreen.ball.image.y <= 15){
        Client.collidedWithWorld({xSpeed: GameScreen.ball.xSpeed, ySpeed: GameScreen.ball.ySpeed});
        GameScreen.ballParticles.emitParticleAt(GameScreen.ball.image.x, GameScreen.ball.image.y);
        GameScreen.ball.xSpeed = 0;
        GameScreen.ball.ySpeed = 0;
        GameScreen.ball.image.y = 16;
    }else if(GameScreen.ball.image.y >= 585){
        Client.collidedWithWorld({xSpeed: GameScreen.ball.xSpeed, ySpeed: GameScreen.ball.ySpeed});
        GameScreen.ballParticles.emitParticleAt(GameScreen.ball.image.x, GameScreen.ball.image.y);
        GameScreen.ball.xSpeed = 0;
        GameScreen.ball.ySpeed = 0;
        GameScreen.ball.image.y = 584;
    }

    GameScreen.ball.image.x += GameScreen.ball.xSpeed;
    GameScreen.ball.image.y += GameScreen.ball.ySpeed;
};

GameScreen.collided = function(){
    Client.collidedWithBat({xSpeed: GameScreen.ball.xSpeed, ySpeed: GameScreen.ball.ySpeed});
    GameScreen.ballParticles.emitParticleAt(GameScreen.ball.image.x, GameScreen.ball.image.y);
    GameScreen.ball.xSpeed = 0;
    GameScreen.ball.ySpeed = 0;
    if(GameScreen.ball.image.x > 400){
        GameScreen.ball.image.x = 720;
    }else if(GameScreen.ball.image.x < 400){
        GameScreen.ball.image.x = 80;
    }
};

GameScreen.movePlayer = function(data){
    if(data.playerNumber == 1){
        if(data.direction == 0){
            GameScreen.p1Bat.up = true;
            GameScreen.p1Bat.down = false;
        }else{
            GameScreen.p1Bat.up = false;
            GameScreen.p1Bat.down = true;
        }
    }else{
        if(data.direction == 0){
            GameScreen.p2Bat.up = true;
            GameScreen.p2Bat.down = false;
        }else{
            GameScreen.p2Bat.up = false;
            GameScreen.p2Bat.down = true;
        }
    }
};

GameScreen.setPlayersBats = function(data){
    console.log("Bats and ball set.");
    GameScreen.p1BatIndex = data.p1Bat;
    GameScreen.p2BatIndex = data.p2Bat;
    GameScreen.ballIndex = data.ball;
};

GameScreen.addScoreToPlayer = function(data){
    if(data.playerNumber == 1){
        GameScreen.player1Score.setText(data.score);
    }else{
        GameScreen.player2Score.setText(data.score);
    }
    GameScreen.pointSound.play();
};

//Called from client when server sends new ball speeds.
GameScreen.updateBallSpeed = function(data){
    GameScreen.ball.xSpeed = data.xSpeed;
    GameScreen.ball.ySpeed = data.ySpeed;
    GameScreen.bounceSound.play();
};

//Called from client when server request ball reset.
GameScreen.resetBallPos = function(){
    GameScreen.ball.image.x = 400;
    GameScreen.ball.image.y = 300;
};

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}