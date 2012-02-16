var game;

function submitCreateGame(form)
{
    console.log("Entered submit");
    game = new game(form.numplayers.value, form.numcards.value);
    
    var maindiv = document.getElementById("main");
    var formdiv = document.getElementById("playerform");
    maindiv.removeChild(formdiv);

    var detailsdiv = document.createElement("div");
    maindiv.setAttribute("id", "detailsdiv");
    
    var players = "Num players : " + game.numplayers;
    var cards = "Num cards : " + game.numcards;
    
    maindiv.innerHTML = players + "</br>" + cards;

    maindiv.appendChild(detailsdiv);
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

