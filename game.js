function Game(numcards, players) {
    this.numplayers = players.length;
    this.numcards = numcards;
    this.players = players;
    this.deck = new Array();
    this.pile = new Array();
    this.burnt = 0;
    this.currentplayer = 0;
    this.lastmove = "";

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
    };

    this.isAtFirstPlayer = function() {
        return this.currentplayer == 0;
    }

    this.firstMove = function() {
        var toLay = new Array();

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
    }

    this.setLastMove = function(toLay) {
        var player = this.players[this.currentplayer];
        this.lastmove = "";
        this.lastmove += player.name;
        this.lastmove += " laid the ";
        for (i = 0; i < toLay.length; i++) {
            this.lastmove += player.hand[toLay[i]].toString();
            this.lastmove += ", ";
        }
    
        
    }
     
    this.playFromHand = function(toLay) {
        var player = this.players[this.currentplayer];
        for (i = 0; i < toLay.length; i++) {
            this.pile.push(player.hand[toLay[i]]);
        }

        player.removeFromHand(toLay);
        
        while ((this.deck.length > 0) && (player.hand.length < this.numcards)) {
            player.dealToHand(this.deck.pop());
        }
    }

    this.makeMove = function(toLay) {
        var player = this.players[this.currentplayer];
        if (player.hasCardsInHand()) {
            this.setLastMove(toLay);
            this.playFromHand(toLay);
            player.sortHand();
            this.nextPlayer();
        }
    }
}
