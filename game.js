var SH = SH || {};

SH.game = SH.game || {};

SH.game.canLay = function (card, cards) {
    if (cards.length == 0) {
        return true;
    } else if (card.isSpecial()) {
        return true;
    } else if (cards[cards.length - 1].isInvisible()) {
        var newCards = cards.slice(0);
        newCards.pop();
        return SH.game.canLay(card, newCards);
    } else if (card.getRank() < cards[cards.length -1].getRank()) {
        return false;
    } else {
        return true;
    }
};

SH.game.Game = function (numcards, players) {
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
            singleDeck.push(SH.card.card(rank, suit));
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
        var currentLowest = this.players[this.currentplayer].getHand()[0];
        for (i = 0; i < this.numplayers ; i++) {
            var playersLowest = this.players[i].getHand()[0];
            if (SH.card.shCompare(playersLowest, currentLowest) == -1) {
                this.currentplayer = i;
            }
        }

        var player = this.players[this.currentplayer];
        var first = player.getHand()[0];
        for (i = 0; i < this.numcards; i++) {
            var current = this.players[this.currentplayer].getHand()[i];
            if (SH.card.rankCompare(current, first) == 0) {
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
        this.lastmove += player.getName();
        this.lastmove += " laid the ";
        for (i = 0; i < toLay.length; i++) {
            this.lastmove += player.getHand()[toLay[i]].toString();
            this.lastmove += ", ";
        }
    };

    this.setLastMovePickup = function() {
        var player = this.players[this.currentplayer];
        this.lastmove = player.getName() + " picked up.";
    };
     
    this.playFromHand = function(toLay) {
        var player = this.players[this.currentplayer];
        for (i = 0; i < toLay.length; i++) {
            this.pile.push(player.getHand()[toLay[i]]);
        }

        player.removeFromHand(toLay);
        
        while ((this.deck.length > 0) && (player.getHand().length < this.numcards)) {
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
    
            if (SH.card.allRanksEqual(lastFour)) {
                return true;
            }
        }
        return false;
    };

    this.burnPile = function() {
        var player = this.players[this.currentplayer];
        this.burnt += this.pile.length;
        this.pile = [];

        this.lastmove = player.getName();
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
        player.setHand(player.getHand().concat(this.pile));
        player.sortHand();
        this.pile = [];
        this.setLastMovePickup();
        this.nextPlayer();
    };

    this.missAGo = function() {
        var player = this.players[this.currentplayer];
        this.lastmove = player.getName();
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
            return this.canMoveWithOneOf(player.getHand());
        } else if (player.hasCardsInFaceUp()) {
            return this.canMoveWithOneOf(player.getFaceUp());
        } else {
            return false;
        }
    };

    this.canMoveWithOneOf = function(cards) {
        for (i = 0; i < cards.length; i++) {
            if (SH.game.canLay(cards[i], this.pile)) {
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
                if (i >= player.getHand().length) {
                    return false;
                } else {
                    cards.push(player.getHand()[choices[i]]);
                }
            }
        } else {
            for (i = 0; i < choices.length; i++) {
                if (i >= player.getFaceUp().length) {
                    return false;
                } else {
                    cards.push(player.getFaceUp()[choices[i]]);
                }
            }
        }
        return this.validMoveWithCards(cards);
    };

    this.validMoveWithCards = function(cards) {
        if (!SH.card.allRanksEqual(cards)) {
            return false;
        } else {
            return SH.game.canLay(cards[0], this.pile);
        }
    };
};
