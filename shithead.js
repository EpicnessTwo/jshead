var game;
var main;
var playerform;
var divs;
var details;

function hide(adiv) {
    adiv.style.display="none";
    divs.appendChild(adiv);
}

function init() {
    console.log("INIT");
    main = document.getElementById("main");
    playerform = document.getElementById("playerform");
    divs = document.getElementById("divs");
    details = document.getElementById("details");

    main.appendChild(playerform);
    playerform.style.display="inline"; 

    details.style.display="none";
}

function submitCreateGame(form) {
    game = new game(form.numplayers.value, form.numcards.value);
    
    details.style.display="inline";
    main.appendChild(details);

    hide(playerform);
    
    document.getElementById("numPlayers").innerHTML = game.numplayers;
    document.getElementById("numCards").innerHTML = game.numcards;

}

function game(numplayers, numcards) {
    this.numplayers = numplayers;
    this.numcards = numcards;
    this.players = new Array();
}

function player(name, numCards) {
    this.name = name;
    this.numCards = numCards;
    this.getDetails = getDetails;

    function getDetails() {
        return "Name: " + name + ", numCards: " + numCards;
    }
}

