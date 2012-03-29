function Game(numcards, players) {
    this.numplayers = players.length;
    this.numcards = numcards;
    this.players = players;
    this.deck = new Array();

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
}
