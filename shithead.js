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
var divlastmove;
var divplayers;
var divswpplayer;
var divmove;
var divmovechoice;

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
    divlastmove = document.getElementById("lastmove");
    divplayers = document.getElementById("players");
    divswpplayer = document.getElementById("swp_player");
    divmove = document.getElementById("move");
    divmovechoice = document.getElementById("movechoice");

    divdivs.style.display="none";   
    divswap.style.display="none";
    divtitle.style.display="none";
    divpile.style.display="none";
    divdeck.style.display="none";
    divburnt.style.display="none";
    divlastmove.style.display="none";
    divplayers.style.display="none";
    divswpplayer.style.display="none";
    divmove.style.display="none";
    divmovechoice.style.display="none";

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

    updateGame();
    appendToMain(divpile);
    appendToMain(divdeck);
    appendToMain(divburnt);
    appendToMain(divlastmove);

    var player = game.getCurrentPlayer();
    updatePlayerSwap(player);
    appendToMain(divswpplayer);
    appendToMain(divswap); 
}

function updateGame() {
    var pilecards = "";
    for (i = game.pile.length - 1; i >= 0; i--) {
        pilecards += game.pile[i].toString();
        pilecards += "<br>";
    }
    
    divpile.innerHTML = game.pile.length + " on pile:<br>" + pilecards;    
    divdeck.innerHTML = game.deck.length + " left on deck<br>";
    divburnt.innerHTML = game.burnt + " burnt<br>";
    divlastmove.innerHTML = game.lastmove + "<br>";
}

function swapCards(form) {
    var player = game.getCurrentPlayer();
    var handcard = form.handcard.value - 1;
    var faceupcard = form.faceupcard.value -1;

    player.swapCards(handcard, faceupcard);
   
    updatePlayerSwap();
 
    form.handcard.value = "";
    form.faceupcard.value = ""; 
}

function updatePlayerSwap() {
    var player = game.getCurrentPlayer();
    var handcards = showCards(player.hand, "Hand", false);
    var faceupcards = showCards(player.faceup, "Face up", false);

    divswpplayer.innerHTML = 
        player.name + "<br>" + 
        handcards + "<br>" + 
        faceupcards + "<br>";
}

function swapDone() {
    game.nextPlayer();
    if (!game.isAtFirstPlayer()) {
        updatePlayerSwap();
    } else {
        hide(divswpplayer);
        hide(divswap);
        game.firstMove();
        updateGame();
        updatePlayers();
        updateMove();
        appendToMain(divplayers);
        appendToMain(divmove);
        appendToMain(divmovechoice);
    }
}

function updateMove() {
    var player = game.getCurrentPlayer();
    var divcontent = player.name;
    divmove.innerHTML = player.name;
    
    if (player.hasCardsInHand()) {
        divcontent += ", choose cards from hand:<br>";
    } else if (player.hasCardsInFaceUp()) {
        divcontent += ", choose cards from face up:<br>";
    } else {
        divcontent += ", choose a card from down:<br>";
    }

    divmove.innerHTML = divcontent;
}

function makeMove(form) {
    var choice = form.choice.value - 1;
    var toLay = new Array();
    toLay.push(choice);
    game.makeMove(toLay);
    updateGame();
    updatePlayers();
    updateMove();
    form.choice.value = "";
}

function updatePlayers() {
    var divcontent = "";
    var player;

    for (i = 0; i < game.players.length; i++) {
        player = game.players[i];
        divcontent += player.name + "<br>";
        var handcards = showCards(player.hand, "Hand", false);
        divcontent += handcards;
        divcontent += "<br>";
        var faceupcards = showCards(player.faceup, "Face up", false);        
        divcontent += faceupcards;
        divcontent += "<br>";
        var facedowncards = showCards(player.facedown, "Face down", true);
        divcontent += facedowncards;
        divcontent += "<br>";
    }

    divplayers.innerHTML = divcontent;
}

function showCards(cards, name, hide) {
    var content = name + ":<br>";
    for (c = 0; c < cards.length; c++) {
        content += "(" + (c+1) + ")";
        if (hide) {
            content += "****";
        } else {
            content += cards[c].toString();
        }
        if (c < cards.length-1) {
            content += ", ";
        }
    }

    return content;
}
