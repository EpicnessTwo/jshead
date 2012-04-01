var numplayers = 1
var maxplayers = 4
var game;

var divmain;
var divgameform;
var divswap;
var divdivs;
var divtitle;
var divpile;
var divdeck;
var divburnt;
var divplayers;
var divswpplayer;

function hide(adiv) {
    adiv.style.display="none";
    divdivs.appendChild(adiv);
}

function appendToMain(adiv) {
    divmain.appendChild(adiv);
    adiv.style.display="inline"; 
}

function init() {
    divmain = document.getElementById("main");
    divgameform = document.getElementById("gameform");
    divswap = document.getElementById("swap");
    divdivs = document.getElementById("divs");
    divtitle = document.getElementById("title");
    divpile = document.getElementById("pile");
    divdeck = document.getElementById("deck");
    divburnt = document.getElementById("burnt");
    divplayers = document.getElementById("players");
    divswpplayer = document.getElementById("swp_player");

    divdivs.style.display="none";   
    divswap.style.display="none";
    divtitle.style.display="none";
    divpile.style.display="none";
    divdeck.style.display="none";
    divburnt.style.display="none";
    divplayers.style.display="none";
    divswpplayer.style.display="none";

    appendToMain(divgameform);    
}

function addplayer() {
    if (numplayers == maxplayers) {
        alert("Upto " + maxplayers + " players are allowed");
    } else {
        var newdiv = document.createElement('div');
        newdiv.id = "frm_player" + (numplayers + 1);
        newdiv.innerHTML = "Player " + (numplayers + 1) + 
            " name: <input type='text' " + 
            "id='frm_player" + (numplayers + 1) + "name' " + 
            "name='frm_player" + (numplayers + 1) + "name'>";
        document.getElementById("frm_players").appendChild(newdiv);
        numplayers++;
    }
}

function createGame(form) {
    hide(divgameform);
    
    var players = new Array(numplayers);

    for (i = 0; i < numplayers; i++) {
        var name = document.getElementById("frm_player" + (i + 1) + "name").value;
        players[i] = new Player(name, form.numcards.value);
    }

    game = new Game(form.numcards.value, players);
    game.deal();
    
    appendToMain(divtitle);

    var pilecards = "";
    for (i = 0; i < game.pile.length; i++) {
        pilecards += game.pile[i].toString();
        pilecards += "<br>";
    }
    
    divpile.innerHTML = game.pile.length + " on pile:<br>" + pilecards;    
    divdeck.innerHTML = game.deck.length + " left on deck<br>";
    divburnt.innerHTML = game.burnt + " burnt<br>";

    appendToMain(divpile);
    appendToMain(divdeck);
    appendToMain(divburnt);

    var player = game.getCurrentPlayer();

    populatePlayerSwap(player);
    
    appendToMain(divswpplayer);
    appendToMain(divswap); 
}

function swapCards(form) {
    var player = game.getCurrentPlayer();
    var handcard = form.handcard.value - 1;
    var faceupcard = form.faceupcard.value -1;

    player.swapCards(handcard, faceupcard);
   
    populatePlayerSwap();
 
    form.handcard.value = "";
    form.faceupcard.value = ""; 
}

function populatePlayerSwap() {
    var player = game.getCurrentPlayer();
    var handcards = "Hand:<br>";
    for (i = 0; i < player.hand.length; i++) {
        handcards += "(" + (i+1) + ")";
        handcards += player.hand[i].toString();
        if (i < player.hand.length-1) {
            handcards += ", ";
        }
    }

    var faceupcards = "Face up:<br>";
    for (i = 0; i < player.faceup.length; i++) {
        faceupcards += "(" + (i+1) + ")";
        faceupcards += player.faceup[i].toString();
        if (i < player.faceup.length-1) {
            faceupcards += ", ";
        }
    }

    divswpplayer.innerHTML = 
        player.name + "<br>" + 
        handcards + "<br>" + 
        faceupcards + "<br>";
}

function swapDone() {
    game.nextPlayer();
    if (!game.isAtFirstPlayer()) {
        populatePlayerSwap();
    } else {
        game.firstMove();
    }
}
