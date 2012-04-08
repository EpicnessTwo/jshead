var SH = SH || {};

SH.gui = SH.gui || {};

SH.gui.numplayers = 1
SH.gui.maxplayers = 4

SH.gui.hide = function (adiv) {
    adiv.style.display="none";
    SH.gui.divdivs.appendChild(adiv);
};

SH.gui.appendToMain = function (adiv) {
    SH.gui.divmain.appendChild(adiv);
    adiv.style.display="inline"; 
};

SH.gui.init = function () {
    SH.gui.divmain = document.getElementById("main");
    SH.gui.divgameform = document.getElementById("gameform");
    SH.gui.divswap = document.getElementById("swap");
    SH.gui.divdivs = document.getElementById("divs");
    SH.gui.divtitle = document.getElementById("title");
    SH.gui.divpile = document.getElementById("pile");
    SH.gui.divdeck = document.getElementById("deck");
    SH.gui.divburnt = document.getElementById("burnt");
    SH.gui.divlastmove = document.getElementById("lastmove");
    SH.gui.divplayers = document.getElementById("players");
    SH.gui.divswpplayer = document.getElementById("swp_player");
    SH.gui.divmessage = document.getElementById("message");
    SH.gui.divmovechoice = document.getElementById("movechoice");
    SH.gui.divpickup = document.getElementById("pickup");
    SH.gui.divbadmove = document.getElementById("badmove");

    SH.gui.divdivs.style.display="none";   
    SH.gui.divswap.style.display="none";
    SH.gui.divtitle.style.display="none";
    SH.gui.divpile.style.display="none";
    SH.gui.divdeck.style.display="none";
    SH.gui.divburnt.style.display="none";
    SH.gui.divlastmove.style.display="none";
    SH.gui.divplayers.style.display="none";
    SH.gui.divswpplayer.style.display="none";
    SH.gui.divmessage.style.display="none";
    SH.gui.divmovechoice.style.display="none";
    SH.gui.divpickup.style.display="none";
    SH.gui.divbadmove.style.display="none";

    SH.gui.appendToMain(SH.gui.divgameform);    
};

SH.gui.addplayer = function () {
    if (SH.gui.numplayers == SH.gui.maxplayers) {
        alert("Upto " + SH.gui.maxplayers + " players are allowed");
    } else {
        var newdiv = document.createElement('div');
        newdiv.id = "frm_player" + (SH.gui.numplayers + 1);
        newdiv.innerHTML = "Player " + (SH.gui.numplayers + 1) + 
            " name: <input type='text' " + 
            "id='frm_player" + (SH.gui.numplayers + 1) + "name' " + 
            "name='frm_player" + (SH.gui.numplayers + 1) + "name'>";
        document.getElementById("frm_players").appendChild(newdiv);
        SH.gui.numplayers++;
    }
};

SH.gui.createGame = function (form) {
    SH.gui.hide(SH.gui.divgameform);
    
    var players = [];

    for (i = 0; i < SH.gui.numplayers; i++) {
        var name = document.getElementById("frm_player" + (i + 1) + "name").value;
        players.push(SH.player.player(name, form.numcards.value));
    }

    SH.gui.game = new SH.game.game(form.numcards.value, players);
    SH.gui.game.deal();
    
    SH.gui.appendToMain(SH.gui.divtitle);

    SH.gui.updateGame();
    SH.gui.appendToMain(SH.gui.divpile);
    SH.gui.appendToMain(SH.gui.divdeck);
    SH.gui.appendToMain(SH.gui.divburnt);
    SH.gui.appendToMain(SH.gui.divlastmove);

    var player = SH.gui.game.getCurrentPlayer();
    SH.gui.updatePlayerSwap(player);
    SH.gui.appendToMain(SH.gui.divswpplayer);
    SH.gui.appendToMain(SH.gui.divswap); 
};

SH.gui.swapCards = function (form) {
    var player = SH.gui.game.getCurrentPlayer();
    var handcard = form.handcard.value - 1;
    var faceupcard = form.faceupcard.value -1;

    player.swapCards(handcard, faceupcard);
    player.sortHand();
   
    SH.gui.updatePlayerSwap();
 
    form.handcard.value = "";
    form.faceupcard.value = ""; 
};

SH.gui.swapDone = function () {
    SH.gui.game.nextPlayer();
    if (!SH.gui.game.isAtFirstPlayer()) {
        SH.gui.updatePlayerSwap();
    } else {
        SH.gui.hide(SH.gui.divswpplayer);
        SH.gui.hide(SH.gui.divswap);
        SH.gui.game.firstMove();
        SH.gui.updateGame();
        SH.gui.updatePlayers();
        SH.gui.appendToMain(SH.gui.divplayers);

        SH.gui.tryMove();
    }
};

SH.gui.tryMove = function () {
    if (SH.gui.game.currentPlayerCanLay()) {
        SH.gui.showMoveMessage();
        SH.gui.appendToMain(SH.gui.divmessage);
        SH.gui.hide(SH.gui.divpickup);
        SH.gui.appendToMain(SH.gui.divmovechoice);
    } else {
        SH.gui.showPickupMessage();
        SH.gui.appendToMain(SH.gui.divmessage);
        SH.gui.hide(SH.gui.divmovechoice);
        SH.gui.appendToMain(SH.gui.divpickup);
    }
};

SH.gui.makeMove = function (form) {
    var choice = form.choice.value - 1;
    var toLay = [];

    SH.gui.hide(SH.gui.divbadmove);
    toLay.push(choice);
    if (SH.gui.game.validMove(toLay)) {
        SH.gui.game.makeMove(toLay);
        form.choice.value = "";
        SH.gui.updateGame();
        SH.gui.updatePlayers();
    } else {
        SH.gui.appendToMain(SH.gui.divbadmove);
        form.choice.value = "";
    }
   
    SH.gui.tryMove();
};

SH.gui.pickup = function () {
    SH.gui.game.pickup();
    SH.gui.hide(SH.gui.divpickup);
    SH.gui.updateGame();
    SH.gui.updatePlayers();
    SH.gui.tryMove();
};

SH.gui.showCards = function (cards, name, hide) {
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

SH.gui.updateGame = function () {
    var pilecards = "";
    for (i = SH.gui.game.getPile().length - 1; i >= 0; i--) {
        pilecards += SH.gui.game.getPile()[i].toString();
        pilecards += "<br>";
    }
    
    SH.gui.divpile.innerHTML = SH.gui.game.getPile().length + 
        " on pile:<br>" + pilecards;    
    SH.gui.divdeck.innerHTML = SH.gui.game.getDeck().length + 
        " left on deck<br>";
    SH.gui.divburnt.innerHTML = SH.gui.game.getBurnt() + " burnt<br>";
    SH.gui.divlastmove.innerHTML = SH.gui.game.getLastmove() + "<br>";
};

SH.gui.showMoveMessage = function () {
    var player = SH.gui.game.getCurrentPlayer();
    var divcontent = player.getName();
    SH.gui.divmessage.innerHTML = player.getName();
    
    if (player.hasCardsInHand()) {
        divcontent += ", choose cards from hand:<br>";
    } else if (player.hasCardsInFaceUp()) {
        divcontent += ", choose cards from face up:<br>";
    } else {
        divcontent += ", choose a card from down:<br>";
    }

    SH.gui.divmessage.innerHTML = divcontent;
};

SH.gui.showPickupMessage = function () {
    var player = SH.gui.game.getCurrentPlayer();
    SH.gui.divmessage.innerHTML = 
        "OH NO! " + player.getName() + ", you must pickup.";
};

SH.gui.updatePlayerSwap = function () {
    var player = SH.gui.game.getCurrentPlayer();

    SH.gui.divswpplayer.innerHTML = 
        player.getName() + "<br>" + 
        SH.gui.showCards(player.getHand(), "Hand", false) + "<br>" + 
        SH.gui.showCards(player.getFaceUp(), "Face up", false) + "<br>";
};

SH.gui.updatePlayers = function () {
    var divcontent = "";
    var player;

    for (i = 0; i < SH.gui.game.getPlayers().length; i++) {
        player = SH.gui.game.getPlayers()[i];
        divcontent += player.getName() + "<br>";
        divcontent += SH.gui.showCards(player.getHand(), "Hand", false);
        divcontent += "<br>";
        divcontent += SH.gui.showCards(player.getFaceUp(), "Face up", false);        
        divcontent += "<br>";
        divcontent += SH.gui.showCards(player.getFaceDown(), "Face down", true);
        divcontent += "<br>";
    }

    SH.gui.divplayers.innerHTML = divcontent;
};

