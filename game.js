function Game(numcards, players) {
    this.numplayers = players.length;
    this.numcards = numcards;
    this.players = players;
    this.deck = [];
    this.pile = [];
    this.burnt = 0;
    this.currentplayer = 0;
    this.lastmove = "";

    var cardsNeeded = numcards * players.length * 3;
        
    var singleDeck = [];
    for (rank = 2; rank < 15; rank++) {
        for (suit = 1; suit < 5; suit++) {
            singleDeck.push(new Card(rank, suit));
        }
    }
        
    while(this.deck.length < cardsNeeded) {
        this.deck = this.deck.concat(singleDeck);
    }   

    this.deal = function() {
        this.shuffle();
        for (i = 0; i < this.players.length; i++) {
            for (j = 0; j < this.numcards; j++) {
                this.players[i].dealToHand(this.deck.pop());
                this.players[i].dealToFaceUp(this.deck.pop());
                this.players[i].dealToFaceDown(this.deck.pop());
            }
            this.players[i].sortHand();
        }
    };

    this.shuffle = function() {
        for (var j, x, i = this.deck.length; i; 
            j = parseInt(Math.random() * i), x = 
                this.deck[--i], this.deck[i] = this.deck[j], this.deck[j] = x);
    };

    this.getCurrentPlayer = function() {
        return this.players[this.currentplayer];
    };

    this.nextPlayer = function() {
        this.currentplayer++;
        if (this.currentplayer >= this.players.length) {
            this.currentplayer = 0;
        }
        while (!this.players[this.currentplayer].hasCards()) {
            this.currentplayer++;
            if (this.currentplayer >= this.players.length) {
                this.currentplayer = 0;
            }
        }
    };

    this.isAtFirstPlayer = function() {
        return this.currentplayer == 0;
    };

    this.firstMove = function() {
        var toLay = [];

        this.currentplayer = 0;
        var currentLowest = this.players[this.currentplayer].hand[0];
        for (i = 0; i < this.numplayers ; i++) {
            var playersLowest = this.players[i].hand[0];
            if (shCompare(playersLowest, currentLowest) == -1) {
                this.currentplayer = i;
            }
        }

        var player = this.players[this.currentplayer];
        var first = player.hand[0];
        for (i = 0; i < this.numcards; i++) {
            var current = this.players[this.currentplayer].hand[i];
            if (rankCompare(current, first) == 0) {
                toLay.push(i);
            }
        }
        
        this.setLastMove(toLay);
        this.playFromHand(toLay);
        player.sortHand();
        this.nextPlayer();
    };

    this.setLastMove = function(toLay) {
        var player = this.players[this.currentplayer];
        this.lastmove = "";
        this.lastmove += player.name;
        this.lastmove += " laid the ";
        for (i = 0; i < toLay.length; i++) {
            this.lastmove += player.hand[toLay[i]].toString();
            this.lastmove += ", ";
        }
    };

    this.setLastMovePickup = function() {
        var player = this.players[this.currentplayer];
        this.lastmove = player.name + " picked up.";
    };
     
    this.playFromHand = function(toLay) {
        var player = this.players[this.currentplayer];
        for (i = 0; i < toLay.length; i++) {
            this.pile.push(player.hand[toLay[i]]);
        }

        player.removeFromHand(toLay);
        
        while ((this.deck.length > 0) && (player.hand.length < this.numcards)) {
            player.dealToHand(this.deck.pop());
        }
    };

    this.makeMove = function(toLay) {
        var player = this.players[this.currentplayer];

        if (player.hasCardsInHand()) {
            this.setLastMove(toLay);
            this.playFromHand(toLay);
            player.sortHand();
        }

        this.processSpecialCards();
    };
    
    this.processSpecialCards = function() {
        if (this.burnCardLaid()) {
            this.burnPile();
        } else if (this.missAGoLaid()) {
            this.missAGo();
        } else {
            this.nextPlayer();
        }
    };

    this.burnCardLaid = function() {
        if (this.pile[this.pile.length - 1].isBurnCard()) {
            return true;
        } else if (this.pile.length > 3) {
            var lastFour = [];
            lastFour.push(this.pile[this.pile.length - 1]);
            lastFour.push(this.pile[this.pile.length - 2]);
            lastFour.push(this.pile[this.pile.length - 3]);
            lastFour.push(this.pile[this.pile.length - 4]);
    
            if (allRanksEqual(lastFour)) {
                return true;
            }
        }
        return false;
    };

    this.burnPile = function() {
        var player = this.players[this.currentplayer];
        this.burnt += this.pile.length;
        this.pile = [];

        this.lastmove = player.name;
        this.lastmove += " burnt the pile.";

        if (!player.hasCards()) {
            nextPlayer();
        }
    };

    this.missAGoLaid = function() {
        return (this.pile[this.pile.length - 1].isMissAGoCard()) ;
    };

    this.pickup = function() {
        var player = this.players[this.currentplayer];
        player.hand = player.hand.concat(this.pile);
        player.sortHand();
        this.pile = [];
        this.setLastMovePickup();
        this.nextPlayer();
    };

    this.missAGo = function() {
        var player = this.players[this.currentplayer];
        this.lastmove = player.name;
        this.lastmove += " laid miss a go card.";
        this.nextPlayer();
        this.nextPlayer();
    };

    this.currentPlayerCanLay = function() {
        if (this.pile.length == 0) {
            return true;
        }

        var player = this.players[this.currentplayer];

        if (player.hasCardsInHand()) {
            return this.canMoveWithOneOf(player.hand);
        } else if (player.hasCardsInFaceUp()) {
            return this.canMoveWithOneOf(player.faceup);
        } else {
            return false;
        }
    };

    this.canMoveWithOneOf = function(cards) {
        for (i = 0; i < cards.length; i++) {
            if (canLay(cards[i], this.pile)) {
                return true;
            }
        }
        return false;
    };

    this.validMove = function(choices) {
        var player = this.players[this.currentplayer];
        var cards = [];

        if (player.hasCardsInHand()) {
            for (i = 0; i < choices.length; i++) {
                if (i >= player.hand.length) {
                    return false;
                } else {
                    cards.push(player.hand[choices[i]]);
                }
            }
        } else {
            for (i = 0; i < choices.length; i++) {
                if (i >= player.faceup.length) {
                    return false;
                } else {
                    cards.push(player.faceup[choices[i]]);
                }
            }
        }
        return this.validMoveWithCards(cards);
    };

    this.validMoveWithCards = function(cards) {
        if (!allRanksEqual(cards)) {
            return false;
        } else {
            return canLay(cards[0], this.pile);
        }
    };
}

function canLay(card, cards) {
    if (cards.length == 0) {
        return true;
    } else if (card.isSpecial()) {
        return true;
    } else if (cards[cards.length - 1].isInvisible()) {
        var newCards = cards.slice(0);
        newCards.pop();
        return canLay(card, newCards);
    } else if (card.rank < cards[cards.length -1].rank) {
        return false;
    } else {
        return true;
    }
}
