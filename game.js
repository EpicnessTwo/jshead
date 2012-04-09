var SH = SH || {};

SH.game = SH.game || (function () {

    return {

        canLay: function (card, cards) {
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
        }, 

        game: function (numcards, players) {
            var numplayers = players.length,
            deck = [],
            pile = [],
            burnt = 0,
            currentplayer = 0,
            lastmove = "",
                
            shuffle = function() {
                for (var j, x, i = deck.length; i; 
                    j = parseInt(Math.random() * i), x = 
                        deck[--i], deck[i] = deck[j], deck[j] = x);
            },

            setLastMove = function(toLay) {
                var player = players[currentplayer];
                lastmove = "";
                lastmove += player.getName();
                lastmove += " laid the ";
                for (var i = 0, len = toLay.length; i < len; i++) {
                    lastmove += player.getHand()[toLay[i]].toString();
                    lastmove += ", ";
                }
            },
            
            setLastMovePickup = function() {
                var player = players[currentplayer];
                lastmove = player.getName() + " picked up.";
            },
            
            playFromHand = function(toLay) {
                var player = players[currentplayer];
                for (var i = 0, len = toLay.length; i < len; i++) {
                    pile.push(player.getHand()[toLay[i]]);
                }

                player.removeFromHand(toLay);
                
                while ((deck.length > 0) && (player.getHand().length < numcards)) {
                    player.dealToHand(deck.pop());
                }
            },
                
            nextPlayer = function() {
                currentplayer++;
                if (currentplayer >= players.length) {
                    currentplayer = 0;
                }
                while (!players[currentplayer].hasCards()) {
                    currentplayer++;
                    if (currentplayer >= players.length) {
                        currentplayer = 0;
                    }
                }
            },
            
            processSpecialCards = function() {
                if (burnCardLaid()) {
                    burnPile();
                } else if (missAGoLaid()) {
                    missAGo();
                } else {
                    nextPlayer();
                }
            },
            
            burnCardLaid = function() {
                if (pile[pile.length - 1].isBurnCard()) {
                    return true;
                } else if (pile.length > 3) {
                    var lastFour = [];
                    lastFour.push(pile[pile.length - 1]);
                    lastFour.push(pile[pile.length - 2]);
                    lastFour.push(pile[pile.length - 3]);
                    lastFour.push(pile[pile.length - 4]);
            
                    if (SH.card.allRanksEqual(lastFour)) {
                        return true;
                    }
                }
                return false;
            },

            burnPile = function() {
                var player = players[currentplayer];
                burnt += pile.length;
                pile = [];

                lastmove = player.getName();
                lastmove += " burnt the pile.";

                if (!player.hasCards()) {
                    nextPlayer();
                }
            },

            missAGoLaid = function() {
                return (pile[pile.length - 1].isMissAGoCard()) ;
            },

            missAGo = function() {
                var player = players[currentplayer];
                lastmove = player.getName();
                lastmove += " laid miss a go card.";
                nextPlayer();
                nextPlayer();
            },
            
            canMoveWithOneOf = function(cards) {
                for (var i = 0, len = cards.length; i < len; i++) {
                    if (SH.game.canLay(cards[i], pile)) {
                        return true;
                    }
                }
                return false;
            },

            validMoveWithCards = function(cards) {
                if (!SH.card.allRanksEqual(cards)) {
                    return false;
                } else {
                    return SH.game.canLay(cards[0], pile);
                }
            };

            (function init() {
                var cardsNeeded = numcards * players.length * 3,
                singleDeck = [],
                rank,
                suit;
                
                for (var rank = 2; rank < 15; rank++) {
                    for (var suit = 1; suit < 5; suit++) {
                        singleDeck.push(SH.card.card(rank, suit));
                    }
                }
                    
                while(deck.length < cardsNeeded) {
                    deck = deck.concat(singleDeck);
                }   
            }());

            return {

                getPlayers: function () {
                    return players;
                },

                getDeck: function () {
                    return deck;
                },

                getPile: function () {
                    return pile;
                },

                getBurnt: function () {
                    return burnt;
                },

                getLastmove: function () {
                    return lastmove;
                },

                deal: function () {
                    shuffle();
                    for (var i = 0, len = players.length; i < len; i++) {
                        for (var j = 0; j < numcards; j++) {
                            players[i].dealToHand(deck.pop());
                            players[i].dealToFaceUp(deck.pop());
                            players[i].dealToFaceDown(deck.pop());
                        }
                        players[i].sortHand();
                    }
                },

                getCurrentPlayer: function () {
                    return players[currentplayer];
                },

                nextPlayer: nextPlayer,

                isAtFirstPlayer: function () {
                    return currentplayer == 0;
                },

                firstMove: function () {
                    var toLay = [],
                    currentLowest = players[0].getHand()[0],
                    playersLowest,
                    player,
                    current,
                    first;

                    currentplayer = 0;
                    for (var i = 0; i < numplayers ; i++) {
                        playersLowest = players[i].getHand()[0];
                        if (SH.card.shCompare(playersLowest, currentLowest) == -1) {
                            currentplayer = i;
                        }
                    }

                    player = players[currentplayer];
                    first = player.getHand()[0];
                    for (var i = 0; i < numcards; i++) {
                        current = players[currentplayer].getHand()[i];
                        if (SH.card.rankCompare(current, first) == 0) {
                            toLay.push(i);
                        }
                    }
                    
                    setLastMove(toLay);
                    playFromHand(toLay);
                    player.sortHand();
                    nextPlayer();
                },

                makeMove: function (toLay) {
                    var player = players[currentplayer];

                    if (player.hasCardsInHand()) {
                        setLastMove(toLay);
                        playFromHand(toLay);
                        player.sortHand();
                    }

                    processSpecialCards();
                },

                pickup: function () {
                    var player = players[currentplayer];
                    player.setHand(player.getHand().concat(pile));
                    player.sortHand();
                    pile = [];
                    setLastMovePickup();
                    nextPlayer();
                },

                currentPlayerCanLay: function () {
                    var player = players[currentplayer];
                    
                    if (pile.length == 0) {
                        return true;
                    }
                    if (player.hasCardsInHand()) {
                        return canMoveWithOneOf(player.getHand());
                    } else if (player.hasCardsInFaceUp()) {
                        return canMoveWithOneOf(player.getFaceUp());
                    } else {
                        return false;
                    }
                },

                validMove: function (choices) {
                    var player = players[currentplayer];
                    var cards = [];

                    if (player.hasCardsInHand()) {
                        for (var i = 0, len = choices.length; i < len; i++) {
                            if (i >= player.getHand().length) {
                                return false;
                            } else {
                                cards.push(player.getHand()[choices[i]]);
                            }
                        }
                    } else {
                        for (var i = 0, len = choices.length; i < len; i++) {
                            if (i >= player.getFaceUp().length) {
                                return false;
                            } else {
                                cards.push(player.getFaceUp()[choices[i]]);
                            }
                        }
                    }
                    return validMoveWithCards(cards);
                }
            };
        }
    };
}());
