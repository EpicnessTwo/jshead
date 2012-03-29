function Player(name, numCards) {
    this.name = name;
    this.numCards = numCards;
    this.getDetails = getDetails;
    this.card = new Card(Rank.ACE, Suit.SPADES);

    function getDetails() {
        return "Name: " + this.name + ", numCards: " + this.numCards +
            ", Card = " + this.card.toString();
    }
}

