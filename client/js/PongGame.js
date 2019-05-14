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
    await sleep(500);
    console.log("Create Running.");
    //Need to get the location from server and update clients
    GameScreen.p1Bat = this.add.image(50, 300, globalVars.bats[GameScreen.p1BatIndex]);
    GameScreen.p2Bat = this.add.image(750, 300, globalVars.bats[GameScreen.p2BatIndex]);
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

    //input for computers.
    
};

GameScreen.update = function(){

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