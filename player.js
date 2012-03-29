function Player(name, numCards) {
    this.name = name;
    this.numCards = numCards;
    this.getDetails = getDetails;
    this.hand = new Array();
    this.faceup = new Array();
    this.facedown = new Array();
    this.dealToHand = dealToHand;
    this.dealToFaceUp = dealToFaceUp;
    this.dealToFaceDown = dealToFaceDown;

    function getDetails() {
        return "Name: " + this.name + ", numCards: " + this.numCards +
            ", Card = " + this.hand[0].toString();
    }

    function dealToHand(card) {
        this.hand.push(card);
    }
    
    function dealToFaceUp(card) {
        this.faceup.push(card);
    }

    function dealToFaceDown(card) {
        this.facedown.push(card);
    }
}

