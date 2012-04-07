var SH = SH || {};

SH.player = SH.player || {};

SH.player.Player = function (name, numCards) {
    this.name = name;
    this.numCards = numCards;
    this.hand = [];
    this.faceup = [];
    this.facedown = [];

    this.dealToHand = function(card) {
        this.hand.push(card);
    };
    
    this.dealToFaceUp = function(card) {
        this.faceup.push(card);
    };

    this.dealToFaceDown = function(card) {
        this.facedown.push(card);
    };

    this.swapCards = function(handcard, faceupcard) {
        var tmp = this.hand[handcard];
        this.hand[handcard] = this.faceup[faceupcard];
        this.faceup[faceupcard] = tmp;
    };

    this.sortHand = function() {
        this.hand.sort(SH.card.shCompare);
    };

    this.removeFromHand = function(toRemove) {
        var newHand = [];
        for (i = 0; i < this.hand.length; i++) {
            if (toRemove.indexOf(i) == -1) {
                newHand.push(this.hand[i]);
            }
        }

        this.hand = newHand;
    };

    this.hasCardsInHand = function() {
        return this.hand.length > 0;
    };

    this.hasCardsInFaceUp = function() {
        return this.faceup.length > 0;
    };

    this.hasCards = function () {
        return (this.hasCardsInHand() || 
                this.hasCardsInFaceUp() || 
                this.facedown.length > 0);
    };
};
