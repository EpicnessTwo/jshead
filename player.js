var SH = SH || {};

SH.player = SH.player || (function () {

    return {

        player: function (name, numCards) {
            var hand = [],
            faceup = [],
            facedown = [];

            return {
            
                getName: function () {
                    return name;
                },

                getHand: function () {
                    return hand;
                },

                setHand: function (newHand) {
                    hand = newHand;
                },

                getFaceUp: function () {
                    return faceup;
                },

                getFaceDown: function () {
                    return facedown;
                },

                dealToHand: function (card) {
                    hand.push(card);
                },
            
                dealToFaceUp: function (card) {
                    faceup.push(card);
                },

                dealToFaceDown: function (card) {
                    facedown.push(card);
                },

                swapCards: function (handcard, faceupcard) {
                    var tmp = hand[handcard];
                    hand[handcard] = faceup[faceupcard];
                    faceup[faceupcard] = tmp;
                },

                sortHand: function () {
                    hand.sort(SH.card.shCompare);
                },

                removeFromHand: function (toRemove) {
                    var newHand = [];
                    for (var i = 0, len = hand.length; i < len; i++) {
                        if (toRemove.indexOf(i) == -1) {
                            newHand.push(hand[i]);
                        }
                    }

                    hand = newHand;
                },

                hasCardsInHand: function () {
                    return hand.length > 0;
                },

                hasCardsInFaceUp: function () {
                    return faceup.length > 0;
                },

                hasCards: function () {
                    return (hand.length > 0 || 
                            faceup.length > 0 || 
                            facedown.length > 0);
                }
            };
        }
    };
}());
