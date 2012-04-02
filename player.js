function Player(name, numCards) {
    this.name = name;
    this.numCards = numCards;
    this.hand = new Array();
    this.faceup = new Array();
    this.facedown = new Array();

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
        this.hand.sort(shCompare);
    }

    this.removeFromHand = function(toRemove) {
        var newHand = new Array();
        for (i = 0; i < this.hand.length; i++) {
            if (toRemove.indexOf(i) == -1) {
                newHand.push(this.hand[i]);
            }
        }

        this.hand = newHand;
    }
}
