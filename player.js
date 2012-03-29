function Player(name, numCards) {
    this.name = name;
    this.numCards = numCards;
    this.hand = new Array();
    this.faceup = new Array();
    this.facedown = new Array();

    this.dealToHand = dealToHand;
    this.dealToFaceUp = dealToFaceUp;
    this.dealToFaceDown = dealToFaceDown;
    this.swapCards = swapCards;

    function dealToHand(card) {
        this.hand.push(card);
    }
    
    function dealToFaceUp(card) {
        this.faceup.push(card);
    }

    function dealToFaceDown(card) {
        this.facedown.push(card);
    }

    function swapCards(handcard, faceupcard) {
        var tmp = this.hand[handcard];
        this.hand[handcard] = this.faceup[faceupcard];
        this.faceup[faceupcard] = tmp;
    }
}

