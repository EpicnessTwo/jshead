var game;

function init()
{
    main = document.getElementById("main");
    playerform = document.getElementById("playerform");
    details = document.getElementById("details");
    
    main.appendChild(playerform);
    details.style.visibility="hidden";
}

function submitCreateGame(form)
{
    console.log("Entered submit");
    game = new game(form.numplayers.value, form.numcards.value);
    
    main.removeChild(playerform);

    details.style.visibility="visible";
    main.appendChild(details);
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

