$(document).ready(function(){
    
module("Card");

    test("Create card", function() {
        var card = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.HEARTS);
        var cardStr = card.toString();

        equal(cardStr, "TWO of HEARTS");
    });

    test("Two is special", function() {
        var card = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.DIAMONDS);

        ok(card.isSpecial());
    });

    test("Seven is special", function() {
        var card = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.CLUBS);

        ok(card.isSpecial());
    });

    test("Ten is special", function() {
        var card = new SH.card.Card(SH.card.Rank.TEN, SH.card.Suit.SPADES);

        ok(card.isSpecial());
    });

    test("Seven is invisible", function() {
        var card = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.HEARTS);
        
        ok(card.isInvisible());
    });
    
    test("Three is less than nine", function() {
        var three = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var nine = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.SPADES);

        equal(SH.card.shCompare(three, nine), -1);
    });

    test("Three is less than Four", function() {
        var three = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var four = new SH.card.Card(SH.card.Rank.FOUR, SH.card.Suit.HEARTS);

        equal(SH.card.shCompare(three, four), -1);
    });
        
    test("Three is same as Three", function() {
        var threed = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var threec = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.CLUBS);

        equal(SH.card.shCompare(threed, threec), 0);
    });

    test("Nine is higher than Three", function() {
        var nine = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.DIAMONDS);
        var three = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.CLUBS);

        equal(SH.card.shCompare(nine, three), 1);
    });

    test("Special higher than not special", function() {
        var two = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.DIAMONDS);
        var six = new SH.card.Card(SH.card.Rank.SIX, SH.card.Suit.CLUBS);

        equal(SH.card.shCompare(two, six), 1);
    });

    test("All ranks equal", function() {
        var nineh = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.HEARTS);
        var nines = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.SPADES);
        var nined = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.DIAMONDS);
        var ninec = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.CLUBS);
    
        var cards = [nineh, nines, nined, ninec];

        ok(SH.card.allRanksEqual(cards));
    });

    test("Is burn card", function() {
        var ten = new SH.card.Card(SH.card.Rank.TEN, SH.card.Suit.CLUBS);
        
        ok(ten.isBurnCard());
    });

    test("Is miss a go card", function() {
        var eight = new SH.card.Card(SH.card.Rank.EIGHT, SH.card.Suit.CLUBS);
        
        ok(eight.isMissAGoCard());
    });

    test("Three is not burn card", function() {
        var three = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.CLUBS);
        
        ok(!three.isBurnCard());
    });

    test("Nine is not miss a go card", function() {
        var nine = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.CLUBS);
        
        ok(!nine.isMissAGoCard());
    });

module("Player");

    test("Create player", function() {
        var player = new SH.player.Player("James", 3);

        equal(player.name, "James", "name set");
        equal(player.numCards, 3, "num cards");
        equal(player.hand.length, 0, "hand");
        equal(player.faceup.length, 0, "faceup");
        equal(player.facedown.length, 0, "facedown");
    });

    test("Deal card to hand", function() {
        var player = new SH.player.Player("James", 3);
        var card = new SH.card.Card(SH.card.Rank.FIVE, SH.card.Suit.SPADES);
        player.dealToHand(card);
        
        equal(player.hand[0], card);
    });

    test("Deal two cards to hand", function() {
        var player = new SH.player.Player("James", 3);
        var card1 = new SH.card.Card(SH.card.Rank.FIVE, SH.card.Suit.SPADES);
        var card2 = new SH.card.Card(SH.card.Rank.ACE, SH.card.Suit.DIAMONDS);
        player.dealToHand(card1);
        player.dealToHand(card2);
        
        equal(player.hand[0], card1);
        equal(player.hand[1], card2);
    });
    
    test("Deal card to faceup", function() {
        var player = new SH.player.Player("James", 3);
        var card = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.SPADES);
        player.dealToFaceUp(card);
        
        equal(player.faceup[0], card);
    });

    test("Deal card to facedown", function() {
        var player = new SH.player.Player("James", 3);
        var card = new SH.card.Card(SH.card.Rank.JACK, SH.card.Suit.HEARTS);
        player.dealToFaceDown(card);
        
        equal(player.facedown[0], card);
    });

    test("Swap first and first", function() {
        var player = new SH.player.Player("James", 3);

        var threed = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var sevens = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.SPADES);
        var aced = new SH.card.Card(SH.card.Rank.ACE, SH.card.Suit.DIAMONDS);
        var twoh = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.HEARTS);
        var jackc = new SH.card.Card(SH.card.Rank.JACK, SH.card.Suit.CLUBS);
        var eights = new SH.card.Card(SH.card.Rank.EIGHT, SH.card.Suit.SPADES);
        
        player.dealToHand(threed);
        player.dealToHand(sevens);
        player.dealToHand(aced);
        player.dealToFaceUp(twoh);
        player.dealToFaceUp(jackc);
        player.dealToFaceUp(eights);

        player.swapCards(0, 0);
    
        equal(player.hand[0], twoh);
        equal(player.faceup[0], threed);
    });

    test("Swap first and second", function() {
        var player = new SH.player.Player("James", 3);

        var threed = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var sevens = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.SPADES);
        var aced = new SH.card.Card(SH.card.Rank.ACE, SH.card.Suit.DIAMONDS);
        var twoh = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.HEARTS);
        var jackc = new SH.card.Card(SH.card.Rank.JACK, SH.card.Suit.CLUBS);
        var eights = new SH.card.Card(SH.card.Rank.EIGHT, SH.card.Suit.SPADES);
        
        player.dealToHand(threed);
        player.dealToHand(sevens);
        player.dealToHand(aced);
        player.dealToFaceUp(twoh);
        player.dealToFaceUp(jackc);
        player.dealToFaceUp(eights);

        player.swapCards(0, 1);
    
        equal(player.hand[0], jackc);
        equal(player.faceup[1], threed);
    });
        
    test("Swap first and third", function() {
        var player = new SH.player.Player("James", 3);

        var threed = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var sevens = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.SPADES);
        var aced = new SH.card.Card(SH.card.Rank.ACE, SH.card.Suit.DIAMONDS);
        var twoh = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.HEARTS);
        var jackc = new SH.card.Card(SH.card.Rank.JACK, SH.card.Suit.CLUBS);
        var eights = new SH.card.Card(SH.card.Rank.EIGHT, SH.card.Suit.SPADES);
        
        player.dealToHand(threed);
        player.dealToHand(sevens);
        player.dealToHand(aced);
        player.dealToFaceUp(twoh);
        player.dealToFaceUp(jackc);
        player.dealToFaceUp(eights);

        player.swapCards(0, 2);
    
        equal(player.hand[0], eights);
        equal(player.faceup[2], threed);
    });

    test("Sort hand", function() {
        var player = new SH.player.Player("James", 5);

        var threed = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var fourd = new SH.card.Card(SH.card.Rank.FOUR, SH.card.Suit.DIAMONDS);
        var jacks = new SH.card.Card(SH.card.Rank.JACK, SH.card.Suit.SPADES);
        var eighth = new SH.card.Card(SH.card.Rank.EIGHT, SH.card.Suit.HEARTS);
        var twoc = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.CLUBS);

        player.dealToHand(twoc);
        player.dealToHand(eighth);
        player.dealToHand(fourd);
        player.dealToHand(threed);
        player.dealToHand(jacks);

        player.sortHand();

        equal(player.hand[0], threed, "three first");
        equal(player.hand[1], fourd, "four second");
        equal(player.hand[2], eighth, "eight third");
        equal(player.hand[3], jacks, "jack fourth");
        equal(player.hand[4], twoc, "two fifth");
    });

    test("Remove one card from hand", function() {
        var player = new SH.player.Player("James", 3);

        var threed = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var fourd = new SH.card.Card(SH.card.Rank.FOUR, SH.card.Suit.DIAMONDS);
        var jacks = new SH.card.Card(SH.card.Rank.JACK, SH.card.Suit.SPADES);
        var eighth = new SH.card.Card(SH.card.Rank.EIGHT, SH.card.Suit.HEARTS);
        var twoc = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.CLUBS);

        player.dealToHand(twoc);
        player.dealToHand(eighth);
        player.dealToHand(fourd);
        player.dealToHand(threed);
        player.dealToHand(jacks);

        var toRemove = [3];

        player.removeFromHand(toRemove);

        equal(player.hand.length, 4, "correct length");
        ok(player.hand.indexOf(twoc) != -1, "contains two of clubs");
        ok(player.hand.indexOf(eighth) != -1, "contains eight of hearts");
        ok(player.hand.indexOf(fourd) != -1, "contains four of diamonds");
        ok(player.hand.indexOf(jacks) != -1, "contains jack of spades");
        ok(player.hand.indexOf(threed) == -1, "three of diamonds removed");
    });

    test("Remove two cards from hand", function() {
        var player = new SH.player.Player("James", 3);

        var threed = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var fourd = new SH.card.Card(SH.card.Rank.FOUR, SH.card.Suit.DIAMONDS);
        var jacks = new SH.card.Card(SH.card.Rank.JACK, SH.card.Suit.SPADES);
        var eighth = new SH.card.Card(SH.card.Rank.EIGHT, SH.card.Suit.HEARTS);
        var twoc = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.CLUBS);

        player.dealToHand(twoc);
        player.dealToHand(eighth);
        player.dealToHand(fourd);
        player.dealToHand(threed);
        player.dealToHand(jacks);

        var toRemove = [3, 1];

        player.removeFromHand(toRemove);

        equal(player.hand.length, 3, "correct length");
        ok(player.hand.indexOf(twoc) != -1, "contains two of clubs");
        ok(player.hand.indexOf(eighth) == -1, "eight of hearts removed");
        ok(player.hand.indexOf(fourd) != -1, "contains four of diamonds");
        ok(player.hand.indexOf(jacks) != -1, "contains jack of spades");
        ok(player.hand.indexOf(threed) == -1, "three of diamonds removed");
    });

    test("Has cards in hand", function() {
        var player = new SH.player.Player("James", 3);
        var threed = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        player.dealToHand(threed);

        ok(player.hasCardsInHand());
    });

    test("Does not have cards in hand", function() {
        var player = new SH.player.Player("James", 3);

        ok(!player.hasCardsInHand());
    });

    test("Has cards in faceup", function() {
        var player = new SH.player.Player("James", 3);
        var threed = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        player.dealToFaceUp(threed);

        ok(player.hasCardsInFaceUp());
    });

    test("Does not have cards in faceup", function() {
        var player = new SH.player.Player("James", 3);

        ok(!player.hasCardsInFaceUp());
    });

    test("Has cards when has hand", function() {
        var player = new SH.player.Player("James", 3);
        
        var card1 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var card2 = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.HEARTS);
        
        player.dealToHand(card1);
        player.dealToHand(card2);
        
        ok(player.hasCards());
    });

    test("Has cards when has faceup", function() {
        var player = new SH.player.Player("James", 3);
        var card1 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var card2 = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.HEARTS);
        
        player.dealToFaceUp(card1);
        player.dealToFaceUp(card2);
        
        ok(player.hasCards());
    });
    
    test("Has cards when has facedown", function() {
        var player = new SH.player.Player("James", 3);
        var card1 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var card2 = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.HEARTS);
        
        player.dealToFaceDown(card1);
        player.dealToFaceDown(card2);
        
        ok(player.hasCards());
    });

    test("Does not have cards", function() {
        var player = new SH.player.Player("James", 3);
        
        ok(!player.hasCards());
    });

module("Game");

    test("Create game", function() {
        var player1 = new SH.player.Player("James", 3);
        var player2 = new SH.player.Player("Dave", 3);
        var players = [player1, player2];
        var game = new SH.game.Game(3, players);
        
        equal(game.numplayers, 2);
        equal(game.numcards, 3);
        equal(game.players[0], player1);
        equal(game.players[1], player2);
        equal(game.deck.length, 52);
        equal(game.pile.length, 0);
        equal(game.burnt, 0);
        equal(game.currentplayer, 0);
    });

    test("New game starts at first player", function() {
        var player1 = new SH.player.Player("James", 3);
        var player2 = new SH.player.Player("Dave", 3);
        var players = [player1, player2];
        var game = new SH.game.Game(3, players);
        var current = game.getCurrentPlayer();

        equal(current, player1);
        ok(game.isAtFirstPlayer());
    });

    test("Next player moves to next player", function() {
        var player1 = new SH.player.Player("James", 3);
        var card1 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        player1.dealToHand(card1);
        var player2 = new SH.player.Player("Dave", 3);
        var card2 = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.SPADES);
        player2.dealToHand(card2);
        var players = [player1, player2];
        var game = new SH.game.Game(3, players);
        game.nextPlayer();
        var current = game.getCurrentPlayer();

        equal(current, player2);
    });
        
    test("Next player rolls", function() {
        var player1 = new SH.player.Player("James", 3);
        var card1 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        player1.dealToHand(card1);
        var player2 = new SH.player.Player("Dave", 3);
        var card2 = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.SPADES);
        player2.dealToHand(card2);
        var players = [player1, player2];
        var game = new SH.game.Game(3, players);
        game.nextPlayer();
        game.nextPlayer();
        var current = game.getCurrentPlayer();

        equal(current, player1);
    });

    test("Next player skips when no cards", function() {
        var player1 = new SH.player.Player("James", 3);
        var card1 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        player1.dealToHand(card1);
        var player2 = new SH.player.Player("Dave", 3);
        var card2 = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.SPADES);
        player2.dealToHand(card2);
        var playerNoCards = new SH.player.Player("NoCards", 3);
        var players = [player1, playerNoCards, player2];
        var game = new SH.game.Game(3, players);
        game.nextPlayer();
        var current = game.getCurrentPlayer();

        equal(current, player2);
    });

    test("Can lay three on nothing", function() {
        var three = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var cards = [];

        ok(SH.game.canLay(three, cards));
    });

    test("Can lay three on three", function() {
        var three1 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var three2 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.SPADES);
        var cards = [three2];

        ok(SH.game.canLay(three1, cards));
    });

    test("Can lay three on two", function() {
        var three = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var two = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.SPADES);
        var cards = [two];

        ok(SH.game.canLay(three, cards));
    });

    test("Can lay three on invisible on nothing", function() {
        var three = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var seven = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.SPADES);
        var cards = [seven];

        ok(SH.game.canLay(three, cards));
    });
    
    test("Can lay three on invisible on three", function() {
        var three1 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var seven = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.SPADES);
        var three2 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.SPADES);
        var cards = [three2, seven];

        ok(SH.game.canLay(three1, cards));
    });

    test("Cannot lay three on invisible on four", function() {
        var three = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var seven = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.HEARTS);
        var four = new SH.card.Card(SH.card.Rank.FOUR, SH.card.Suit.SPADES);
        var cards = [four, seven];

        ok(!SH.game.canLay(three, cards));
    });

    test("Can lay three on two invisibles on three", function() {
        var three1 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var seven1 = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.HEARTS);
        var seven2 = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.SPADES);
        var three2 = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.SPADES);
        var cards = [three2, seven2, seven1, three1];

        ok(SH.game.canLay(three1, cards));
    });

    test("Cannot lay three on four", function() {
        var three = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var four = new SH.card.Card(SH.card.Rank.FOUR, SH.card.Suit.SPADES);
        var cards = [four];

        ok(!SH.game.canLay(three, cards));
    });
    
    test("Cannot lay three on invisible on four", function() {
        var three = new SH.card.Card(SH.card.Rank.THREE, SH.card.Suit.DIAMONDS);
        var seven = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.HEARTS);
        var four = new SH.card.Card(SH.card.Rank.FOUR, SH.card.Suit.SPADES);
        var cards = [four, seven];

        ok(!SH.game.canLay(three, cards));
    });

    test("Can lay two on nine", function() {
        var two = new SH.card.Card(SH.card.Rank.TWO, SH.card.Suit.DIAMONDS);
        var nine = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.HEARTS);
        var cards = [nine];

        ok(SH.game.canLay(two, cards));
    });

    test("Can lay seven on nine", function() {
        var seven = new SH.card.Card(SH.card.Rank.SEVEN, SH.card.Suit.DIAMONDS);
        var nine = new SH.card.Card(SH.card.Rank.NINE, SH.card.Suit.HEARTS);
        var cards = [nine];

        ok(SH.game.canLay(seven, cards));
    });
    
    test("Can lay ten on ace", function() {
        var ten = new SH.card.Card(SH.card.Rank.TEN, SH.card.Suit.DIAMONDS);
        var ace = new SH.card.Card(SH.card.Rank.ACE, SH.card.Suit.HEARTS);
        var cards = [ace];

        ok(SH.game.canLay(ten, cards));
    });
});

