var numplayers = 1
var maxplayers = 4

var game;
var main;
var gameform;
var divs;
var details;

function hide(adiv) {
    adiv.style.display="none";
    divs.appendChild(adiv);
}

function init() {
    main = document.getElementById("main");
    gameform = document.getElementById("gameform");
    divs = document.getElementById("divs");
    details = document.getElementById("details");

    main.appendChild(gameform);
    gameform.style.display="inline"; 

    details.style.display="none";
}

function addplayer() {
    if (numplayers == maxplayers) {
        alert("Upto " + maxplayers + " players are allowed");
    } else {
        var newdiv = document.createElement('div');
        newdiv.id = "player" + (numplayers + 1);
        newdiv.innerHTML = "Player " + (numplayers + 1) + 
            " name: <input type='text' " + 
            "id='player" + (numplayers + 1) + "name' " + 
            "name='player" + (numplayers + 1) + "name'>";
        document.getElementById("players").appendChild(newdiv);
        numplayers++;
    }
}

function submitCreateGame(form) {
    var players = new Array(numplayers);

    for (i = 0; i < numplayers; i++) {
        var name = document.getElementById("player" + (i + 1) + "name").value;
        players[i] = new Player(name, form.numcards.value);
    }

    game = new Game(form.numcards.value, players);
    
    details.style.display="inline";
    main.appendChild(details);

    hide(gameform);
    
    document.getElementById("details_numcards").innerHTML = game.numcards;
    var playersdiv = document.getElementById("details_players");
    
    for (i = 0; i < game.numplayers; i++) {
        var newdiv = document.createElement('div');
        newdiv.id = "player" + (i + 1) + "details";
        newdiv.innerHTML = players[i].getDetails();
        playersdiv.appendChild(newdiv);
    }
}
