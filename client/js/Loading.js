var loadingState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Loading(){
        Phaser.Scene.call(this, {key:'Loading'});
    },
    preload: function(){
        this.fullMessageDisplayed = false;
    },

    create: function(){
        this.add.text(270, 250, 'Connecting...', {font: "50px Impact"});
        this.add.text(270, 320, 'Please ensure server is running.', {font: "20px Impact"});

        Client.askNewPlayer();
        Client.playerNumber();
    },
    
    update: function(){
        if(globalVars.isConnected && globalVars.playerNumber == 1 || globalVars.playerNumber == 2){
            game.scene.start('Menu');
            game.scene.remove('Loading');
        }else if(globalVars.isConnected && globalVars.playerNumber == -1 && this.fullMessageDisplayed == false){
            this.fullMessageDisplayed = true;
            window.alert("Game currently full. Please wait or try again later.");
        }
    }
});

globalVars.scenes.push(loadingState);



// class Loading extends Phaser.Scene{
//     constructor(){
//         super({key:"Loading"});
//     }    

//     preload(){
//         this.fullMessageDisplayed = false;
//     }

//     create(){
//         this.add.text(270, 250, 'Connecting...', {font: "50px Impact"});
//         this.add.text(270, 320, 'Please ensure server is running.', {font: "20px Impact"});

//         Client.askNewPlayer();
//         Client.playerNumber();
//     }

//     update(delta){        
//         if(globalVars.isConnected && globalVars.playerNumber == 1 || globalVars.playerNumber == 2){
//             this.scene.start("Menu");
//         }else if(globalVars.isConnected && globalVars.playerNumber == -1 && this.fullMessageDisplayed == false){
//             this.fullMessageDisplayed = true;
//             window.alert("Game currently full. Please wait or try again later.");
//         }
//     }
// }