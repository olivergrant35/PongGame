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
    GameScreen.playerSpeed = 5;
    //TODO: Change the below to server sided.
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
};

GameScreen.create = async function(){
    //sleep to allow server to set bats before continuing. 
    await sleep(500);
    console.log("Create Running.");
    //Need to get the location from server and update clients
    GameScreen.p1Bat = {
        image: this.add.image(50, 300, globalVars.bats[GameScreen.p1BatIndex]),
        up: false,
        down: false
    };
    GameScreen.p2Bat = {
        image: this.add.image(750, 300, globalVars.bats[GameScreen.p2BatIndex]),
        up: false,
        down: false
    };
    GameScreen.ball = this.add.image(400, 300, globalVars.balls[GameScreen.ballIndex]);
    
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
    console.log("Bats set.");
    GameScreen.p1BatIndex = data.p1Bat;
    GameScreen.p2BatIndex = data.p2Bat;
    GameScreen.ballIndex = data.ball;
};

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }