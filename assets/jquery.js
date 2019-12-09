$(document).ready(function() {
    Restart();

    $( '#Play-Music').on( 'click', function() {
        PlayMusic();
    });

    $( '#Pause-Music').on('click', function() {
        PauseMusic();
    });

    // $( "#characterlist li" ).click(function() {
    $( '#characterlist' ).on( 'click', 'li', function () {
        var $input = $(this);
        $( "#characterlistdiv" ).fadeOut( "slow", function() {            
            var index = $input.attr("listindex")
            var selection = characters[index]
            // alert( "You have selected " +  selection.name );
            SelectPlayer(index)        
            AddPlayerCharacter();
            AddOpponents();
            ClearList("characterlist");
            $( "#selectedcharacter" ).show()
            $( "#opponents" ).show()
            $( "#fightsection" ).show()
          });
        // $( "#characterlistdiv" ).slideToggle()
    });    

    $( '#opponentslist' ).on( 'click', 'li', function () {
        if(gamestate == "CHOOSEDEFENDER"){
            var $input = $(this);
            var index = $input.attr("listindex")
            var selection = characters[index]
            // alert( "You have selected " +  selection.name );
            SelectDefender(index)
            AddDefenderCharacter();
            RemoveDefenderFromOpponentList(index);
        }
    });

    $( "#restartbutton" ).click(function() {
        Restart();
    })

    $( "#fightbutton" ).click(function() {
        ProcessGameState();
        switch(gamestate){
            case 'BATTLE':
                UpdatePlayer();
                UpdateDefender();
                break;
            case 'CHOOSEDEFENDER':
                UpdatePlayer();
                UpdateDefender();
                break;
            case 'VICTORY':
                UpdatePlayer();
                UpdateDefender();
                break;
            case 'DEFEAT':
                UpdatePlayer();
                UpdateDefender();
                break;
        }
    });
});


function Restart(){
    ClearAll();
    ClearLog();
    Initialize();
    AddCharactersToList();
    $( "#characterlistdiv" ).show()
    $( "#selectedcharacter" ).hide()
    $( "#opponents" ).hide()
    $( "#fightsection" ).hide()
};

function AddOutputLog(message){
    var listelement = '<li class="outputlog">';
    listelement += " * " +message;
    listelement += '</li>';
    $( "#logoutput" ).append(listelement).animate({
        scrollTop: $('#logoutput').get(0).scrollHeight
    }, 0);
}

function ClearLog(){
    $( "#logoutput .outputlog" ).remove()
}

function UpdatePlayer(){
    $("#selectedcharacterlist li .healthpoints").html(player.healthpoints)
}

function UpdateDefender(){
    if(defender.healthpoints > 0){
        $("#defenderlist li .healthpoints").html(defender.healthpoints)
    }
    else{
        ClearList("defenderlist");
    }
}

function RemoveDefenderFromOpponentList(index){
    $( "#opponentslist li.charactercard" ).each(function() {
        var $input = $(this);
        var currentindex = $input.attr("listindex")
        var selection = characters[index]
        if(index == currentindex ){
            $input.remove();
        }
    });
}

function ClearAll(list){
    $( ".charactercard" ).remove()
}

function ClearList(list){
    $( "#" +list+" .charactercard" ).remove()
}

function AddCharactersToList(){
    characters.forEach(function(character, i){
        var listelement = '<li class="charactercard" listindex="' + i + '">';
        listelement += '<p><b>' + character.name + '</b></p>';
        listelement += '<img src="' + character.src + '" width="64px" height="36px">'   
        listelement += '<p>' + character.healthpoints + '</p>'
        listelement += '</li>';
        $( "#characterlist" ).append(listelement);
    });
    $( "#characterlist" ).append("<div class='charactercard' style='clear: both'></div>");
}

function AddPlayerCharacter(){
    var character = player;
    var listelement = '<li class="charactercard" listindex="-1">';
    listelement += '<p><b>' + character.name + '</b></p>';
    listelement += '<img src="' + character.src + '" width="64px" height="36px">'   
    listelement += '<p class="healthpoints">' + character.healthpoints + '</p>'
    listelement += '</li>';
    $( "#selectedcharacterlist" ).append(listelement);
    $( "#selectedcharacterlist" ).append("<div class='charactercard' style='clear: both'></div>");
}

function AddDefenderCharacter(){
    var character = defender;
    var listelement = '<li class="charactercard" listindex="-1">';
    listelement += '<p><b>' + character.name + '</b></p>';
    listelement += '<img src="' + character.src + '" width="64px" height="36px">'   
    listelement += '<p class="healthpoints">' + character.healthpoints + '</p>'
    listelement += '</li>';
    $( "#defenderlist" ).append(listelement);
    $( "#defenderlist" ).append("<div class='charactercard' style='clear: both'></div>");
}

function AddOpponents(){    
    opponents.forEach(function(character, i){
        var listelement = '<li class="charactercard" listindex="' + i + '">';
        listelement += '<p><b>' + character.name + '</b></p>';
        listelement += '<img src="' + character.src + '" width="64px" height="36px">'   
        listelement += '<p class="healthpoints">' + character.healthpoints + '</p>'
        listelement += '</li>';
        $( "#opponentslist" ).append(listelement);
    });
    $( "#opponentslist" ).append("<div class='charactercard' style='clear: both'></div>");
}