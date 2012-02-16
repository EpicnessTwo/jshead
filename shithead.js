var game;
var main;
var playerform;
var divs;
var details;

function init()
{
    console.log("INIT");
    main = document.getElementById("main");
    playerform = document.getElementById('playerform');
    divs = document.getElementById("divs");
    details = document.getElementById("details");

    main.appendChild(playerform);
    playerform.style.display="inline"; 

    details.style.display="none";
}

function submitCreateGame(form)
{
    details.style.display="inline";
    main.appendChild(details);

    playerform.style.display="none";    
    divs.appendChild(playerform); 
    
    game = new game(form.numplayers.value, form.numcards.value);
}

function game(numplayers, numcards)
{
    this.numplayers = numplayers;
    this.numcards = numcards;
    this.players = new Array();
}

function player(name, numCards)
{
    this.name = name;
    this.numCards = numCards;
    this.getDetails = getDetails;

    function getDetails()
    {
        return "Name: " + name + ", numCards: " + numCards;
    }
}

