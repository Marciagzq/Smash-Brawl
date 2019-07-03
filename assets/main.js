const gamestates = {
    CHOOSEPLAYER: 'CHOOSEPLAYER',
    CHOOSEDEFENDER: 'CHOOSEDEFENDER',
    BATTLE: 'BATTLE',
    VICTORY: 'VICTORY',
    DEFEAT: 'DEFEAT',
}

var characters = [];
var player = null;
var defender = null
var opponents = [];
var gamestate = null

function Initialize(){
    gamestate = gamestates.CHOOSEPLAYER
    characters = [
        {
            name: "Mario",
            healthpoints: 120,
            attackpower: 7,
            baseattackpower: 7,
            counterattack: 15,
            src: "assets/images/mario.png"
        },
        {
            name: "Link",
            healthpoints: 100,
            attackpower: 12,
            baseattackpower: 12,
            counterattack: 6,
            src: "assets/images/link.png"
        },
        {
            name: "Yoshi",
            healthpoints: 80,
            attackpower: 4,
            baseattackpower: 4,
            counterattack: 3,
            src: "assets/images/yoshi.png"
        },
        {
            name: "Kirby",
            healthpoints: 140,
            attackpower: 10,
            baseattackpower: 10,
            counterattack: 5,
            src: "assets/images/kirby.png"
        },        
    ]
    
}

function SelectPlayer(index){
    player = characters[index];
    opponents = characters.filter(function(character,i){return i!=index})
    gamestate = gamestates.CHOOSEDEFENDER;
}

function SelectDefender(index){
    defender = opponents[index];
    gamestate = gamestates.BATTLE;
}

function ProcessFight(){
    defender.healthpoints -= player.attackpower;
    AddOutputLog("You attacked " + defender.name + " for " + player.attackpower + " damage")
    if(defender.healthpoints > 0){
        player.healthpoints -= defender.counterattack;
        AddOutputLog(defender.name + " attacked you back for " + defender.counterattack + " damage")
    }
    player.attackpower += player.baseattackpower;
    AnalyzeGameState()
}

function AnalyzeGameState(){
    if(player.healthpoints <= 0){
        gamestate = gamestates.DEFEAT;
        AddOutputLog("You have been defeated");
    }
    if(defender.healthpoints <= 0){
        AddOutputLog("You have defeated " + defender.name);
        var remainingopponents = opponents.filter(function(opp){return opp.healthpoints > 0;});
        if(remainingopponents.length == 0){
            gamestate = gamestates.VICTORY;
            AddOutputLog("You have defeated all of your opponents!!!");
        }
        else{
            gamestate = gamestates.CHOOSEDEFENDER;
            AddOutputLog("Choose your next opponent");
        }
    }
}

// Gets Link for Theme Song
       var audioElement = document.createElement("audio");
       audioElement.setAttribute("src", "assets\finalDestination.mp3");  
     
// Theme Button
   $(".theme-button").on("click", function() {
    audioElement.play();
  });
  $(".pause-button").on("click", function() {
    audioElement.pause();
  });

function ProcessGameState(){
    switch(gamestate){
        case 'CHOOSEPLAYER':
            alert("Please choose a Character")
            break;
        case 'CHOOSEDEFENDER':
            alert("Please choose a Defender")
            break;
        case 'BATTLE':
            ProcessFight()
            break;
        case 'VICTORY':
            alert("You have defeated all your opponents")
            break;
        case 'DEFEAT':
            alert("You have been defeated")
            break;
    }
}