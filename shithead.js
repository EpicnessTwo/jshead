var numplayers = 1
var maxplayers = 4
var game;

var divmain;
var divgameform;
var divdivs;
var divtitle;
var divpile;
var divdeck;
var divburnt;
var divplayers;


function hide(adiv) {
    adiv.style.display="none";
    divs.appendChild(adiv);
}

function init() {
    divmain = document.getElementById("main");
    divgameform = document.getElementById("gameform");
    divdivs = document.getElementById("divs");
    divtitle = document.getElementById("title");
    divpile = document.getElementById("pile");
    divdeck = document.getElementById("deck");
    divburnt = document.getElementById("burnt");
    divplayers = document.getElementById("players");

    divmain.appendChild(divgameform);
    divgameform.style.display="inline"; 

    divtitle.style.display="none";
    divpile.style.display="none";
    divdeck.style.display="none";
    divburnt.style.display="none";
    divplayers.style.display="none";
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

function submitCreateGame(form) {
    hide(gameform);
    
    var players = new Array(numplayers);

    for (i = 0; i < numplayers; i++) {
        var name = document.getElementById("frm_player" + (i + 1) + "name").value;
        players[i] = new Player(name, form.numcards.value);
    }

    game = new Game(form.numcards.value, players);
    game.deal();
    
    main.appendChild(divtitle);
    divtitle.style.display="inline";

    var pilecards = "";
    for (i = 0; i < game.pile.length; i++) {
        pilecards += game.pile[i].toString();
        pilecards += "<br>";
    }
    
    divpile.innerHTML = game.pile.length + " on pile:<br>" + pilecards;    
    main.appendChild(divpile);

    divdeck.innerHTML = game.deck.length + " left on deck<br>";
    main.appendChild(divdeck);
    
    divburnt.innerHTML = game.burnt + " burnt<br>";
    main.appendChild(divburnt);

    divpile.style.display="inline";
    divdeck.style.display="inline";
    divburnt.style.display="inline";
    
/*
    details.style.display="inline";
    main.appendChild(details);

    
    document.getElementById("details_decksize").innerHTML = game.deck.length;

    var playersdiv = document.getElementById("details_players");
    
    for (i = 0; i < game.numplayers; i++) {
        var newdiv = document.createElement('div');
        newdiv.id = "player" + (i + 1) + "details";
        newdiv.innerHTML = players[i].getDetails();
        playersdiv.appendChild(newdiv);
    }
*/
}
