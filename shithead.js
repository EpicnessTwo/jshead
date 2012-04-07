var SH = SH || {};

SH.numplayers = 1
SH.maxplayers = 4

SH.hide = function (adiv) {
    adiv.style.display="none";
    SH.divdivs.appendChild(adiv);
};

SH.appendToMain = function (adiv) {
    SH.divmain.appendChild(adiv);
    adiv.style.display="inline"; 
};

SH.init = function () {
    SH.divmain = document.getElementById("main");
    SH.divgameform = document.getElementById("gameform");
    SH.divswap = document.getElementById("swap");
    SH.divdivs = document.getElementById("divs");
    SH.divtitle = document.getElementById("title");
    SH.divpile = document.getElementById("pile");
    SH.divdeck = document.getElementById("deck");
    SH.divburnt = document.getElementById("burnt");
    SH.divlastmove = document.getElementById("lastmove");
    SH.divplayers = document.getElementById("players");
    SH.divswpplayer = document.getElementById("swp_player");
    SH.divmessage = document.getElementById("message");
    SH.divmovechoice = document.getElementById("movechoice");
    SH.divpickup = document.getElementById("pickup");
    SH.divbadmove = document.getElementById("badmove");

    SH.divdivs.style.display="none";   
    SH.divswap.style.display="none";
    SH.divtitle.style.display="none";
    SH.divpile.style.display="none";
    SH.divdeck.style.display="none";
    SH.divburnt.style.display="none";
    SH.divlastmove.style.display="none";
    SH.divplayers.style.display="none";
    SH.divswpplayer.style.display="none";
    SH.divmessage.style.display="none";
    SH.divmovechoice.style.display="none";
    SH.divpickup.style.display="none";
    SH.divbadmove.style.display="none";

    SH.appendToMain(SH.divgameform);    
};

SH.addplayer = function () {
    if (SH.numplayers == SH.maxplayers) {
        alert("Upto " + SH.maxplayers + " players are allowed");
    } else {
        var newdiv = document.createElement('div');
        newdiv.id = "frm_player" + (SH.numplayers + 1);
        newdiv.innerHTML = "Player " + (SH.numplayers + 1) + 
            " name: <input type='text' " + 
            "id='frm_player" + (SH.numplayers + 1) + "name' " + 
            "name='frm_player" + (SH.numplayers + 1) + "name'>";
        document.getElementById("frm_players").appendChild(newdiv);
        SH.numplayers++;
    }
};

SH.createGame = function (form) {
    SH.hide(SH.divgameform);
    
    var players = [];

    for (i = 0; i < SH.numplayers; i++) {
        var name = document.getElementById("frm_player" + (i + 1) + "name").value;
        players.push(new Player(name, form.numcards.value));
    }

    SH.game = new Game(form.numcards.value, players);
    SH.game.deal();
    
    SH.appendToMain(SH.divtitle);

    SH.updateGame();
    SH.appendToMain(SH.divpile);
    SH.appendToMain(SH.divdeck);
    SH.appendToMain(SH.divburnt);
    SH.appendToMain(SH.divlastmove);

    var player = SH.game.getCurrentPlayer();
    SH.updatePlayerSwap(player);
    SH.appendToMain(SH.divswpplayer);
    SH.appendToMain(SH.divswap); 
};

SH.swapCards = function (form) {
    var player = SH.game.getCurrentPlayer();
    var handcard = form.handcard.value - 1;
    var faceupcard = form.faceupcard.value -1;

    player.swapCards(handcard, faceupcard);
    player.sortHand();
   
    SH.updatePlayerSwap();
 
    form.handcard.value = "";
    form.faceupcard.value = ""; 
};

SH.swapDone = function () {
    SH.game.nextPlayer();
    if (!SH.game.isAtFirstPlayer()) {
        SH.updatePlayerSwap();
    } else {
        SH.hide(SH.divswpplayer);
        SH.hide(SH.divswap);
        SH.game.firstMove();
        SH.updateGame();
        SH.updatePlayers();
        SH.appendToMain(SH.divplayers);

        SH.tryMove();
    }
};

SH.tryMove = function () {
    if (SH.game.currentPlayerCanLay()) {
        SH.showMoveMessage();
        SH.appendToMain(SH.divmessage);
        SH.hide(SH.divpickup);
        SH.appendToMain(SH.divmovechoice);
    } else {
        SH.showPickupMessage();
        SH.appendToMain(SH.divmessage);
        SH.hide(SH.divmovechoice);
        SH.appendToMain(SH.divpickup);
    }
};

SH.makeMove = function (form) {
    var choice = form.choice.value - 1;
    var toLay = [];

    SH.hide(SH.divbadmove);
    toLay.push(choice);
    if (SH.game.validMove(toLay)) {
        SH.game.makeMove(toLay);
        form.choice.value = "";
        SH.updateGame();
        SH.updatePlayers();
    } else {
        SH.appendToMain(SH.divbadmove);
        form.choice.value = "";
    }
   
    SH.tryMove();
};

SH.pickup = function () {
    SH.game.pickup();
    SH.hide(SH.divpickup);
    SH.updateGame();
    SH.updatePlayers();
    SH.tryMove();
};

SH.showCards = function (cards, name, hide) {
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
};

SH.updateGame = function () {
    var pilecards = "";
    for (i = SH.game.pile.length - 1; i >= 0; i--) {
        pilecards += SH.game.pile[i].toString();
        pilecards += "<br>";
    }
    
    SH.divpile.innerHTML = SH.game.pile.length + " on pile:<br>" + pilecards;    
    SH.divdeck.innerHTML = SH.game.deck.length + " left on deck<br>";
    SH.divburnt.innerHTML = SH.game.burnt + " burnt<br>";
    SH.divlastmove.innerHTML = SH.game.lastmove + "<br>";
};

SH.showMoveMessage = function () {
    var player = SH.game.getCurrentPlayer();
    var divcontent = player.name;
    SH.divmessage.innerHTML = player.name;
    
    if (player.hasCardsInHand()) {
        divcontent += ", choose cards from hand:<br>";
    } else if (player.hasCardsInFaceUp()) {
        divcontent += ", choose cards from face up:<br>";
    } else {
        divcontent += ", choose a card from down:<br>";
    }

    SH.divmessage.innerHTML = divcontent;
};

SH.showPickupMessage = function () {
    var player = SH.game.getCurrentPlayer();
    SH.divmessage.innerHTML = "OH NO! " + player.name + ", you must pickup.";
};

SH.updatePlayerSwap = function () {
    var player = SH.game.getCurrentPlayer();

    SH.divswpplayer.innerHTML = 
        player.name + "<br>" + 
        SH.showCards(player.hand, "Hand", false) + "<br>" + 
        SH.showCards(player.faceup, "Face up", false) + "<br>";
};

SH.updatePlayers = function () {
    var divcontent = "";
    var player;

    for (i = 0; i < SH.game.players.length; i++) {
        player = SH.game.players[i];
        divcontent += player.name + "<br>";
        divcontent += SH.showCards(player.hand, "Hand", false);
        divcontent += "<br>";
        divcontent += SH.showCards(player.faceup, "Face up", false);        
        divcontent += "<br>";
        divcontent += SH.showCards(player.facedown, "Face down", true);
        divcontent += "<br>";
    }

    SH.divplayers.innerHTML = divcontent;
};

