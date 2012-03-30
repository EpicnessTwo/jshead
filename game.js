function Game(numcards, players) {
    this.numplayers = players.length;
    this.numcards = numcards;
    this.players = players;
    this.deck = new Array();
    this.pile = new Array();
    this.burnt = 0;
    this.currentplayer = 0;

    this.deal = deal;
    this.shuffle = shuffle;
    this.getCurrentPlayer = getCurrentPlayer;
    this.nextPlayer = nextPlayer;

    var cardsNeeded = numcards * players.length * 3;
        
    var singleDeck = new Array();
    for (rank = 2; rank < 15; rank++) {
        for (suit = 1; suit < 5; suit++) {
            singleDeck.push(new Card(rank, suit));
        }
    }
        
    while(this.deck.length < cardsNeeded) {
        this.deck = this.deck.concat(singleDeck);
    }   

    function deal() {
        this.shuffle();
        for (i = 0; i < this.players.length; i++) {
            for (j = 0; j < this.numcards; j++) {
                this.players[i].dealToHand(this.deck.pop());
                this.players[i].dealToFaceUp(this.deck.pop());
                this.players[i].dealToFaceDown(this.deck.pop());
            }
        }
    }

    function shuffle() {
        for (var j, x, i = this.deck.length; i; 
            j = parseInt(Math.random() * i), x = 
                this.deck[--i], this.deck[i] = this.deck[j], this.deck[j] = x);
    }

    function getCurrentPlayer() {
        return this.players[this.currentplayer];
    }

    function nextPlayer() {
        this.currentplayer++;
        if (this.currentplayer >= this.players.length) {
            this.currentplayer = 0;
        }
    }
}
