$(document).ready(function(){
    
module("Card");

    test("Create card", function() {
        var card = new Card(Rank.TWO, Suit.HEARTS);
        var cardStr = card.toString();

        equal(cardStr, "TWO of HEARTS");
    });

    test("Two is special", function() {
        var card = new Card(Rank.TWO, Suit.DIAMONDS);

        ok(card.isSpecial());
    });

    test("Seven is special", function() {
        var card = new Card(Rank.SEVEN, Suit.CLUBS);

        ok(card.isSpecial());
    });

    test("Ten is special", function() {
        var card = new Card(Rank.TEN, Suit.SPADES);

        ok(card.isSpecial());
    });
    
    test("Three is less than nine", function() {
        var three = new Card(Rank.THREE, Suit.DIAMONDS);
        var nine = new Card(Rank.NINE, Suit.SPADES);

        equal(shCompare(three, nine), -1);
    });

    test("Three is less than Four", function () {
        var three = new Card(Rank.THREE, Suit.DIAMONDS);
        var four = new Card(Rank.FOUR, Suit.HEARTS);

        equal(shCompare(three, four), -1);
    });
        
    test("Three is same as Three", function () {
        var threed = new Card(Rank.THREE, Suit.DIAMONDS);
        var threec = new Card(Rank.THREE, Suit.CLUBS);

        equal(shCompare(threed, threec), 0);
    });

    test("Nine is higher than Three", function () {
        var nine = new Card(Rank.NINE, Suit.DIAMONDS);
        var three = new Card(Rank.THREE, Suit.CLUBS);

        equal(shCompare(nine, three), 1);
    });

    test("Special higher than not special", function () {
        var two = new Card(Rank.TWO, Suit.DIAMONDS);
        var six = new Card(Rank.SIX, Suit.CLUBS);

        equal(shCompare(two, six), 1);
    });

module("Player");

    test("Create player", function() {
        var player = new Player("James", 3);

        equal(player.name, "James", "name set");
        equal(player.numCards, 3, "num cards");
        equal(player.hand.length, 0, "hand");
        equal(player.faceup.length, 0, "faceup");
        equal(player.facedown.length, 0, "facedown");
    });

    test("Deal card to hand", function() {
        var player = new Player("James", 3);
        var card = new Card(Rank.FIVE, Suit.SPADES);
        player.dealToHand(card);
        
        equal(player.hand[0], card);
    });

    test("Deal two cards to hand", function() {
        var player = new Player("James", 3);
        var card1 = new Card(Rank.FIVE, Suit.SPADES);
        var card2 = new Card(Rank.ACE, Suit.DIAMONDS);
        player.dealToHand(card1);
        player.dealToHand(card2);
        
        equal(player.hand[0], card1);
        equal(player.hand[1], card2);
    });
    
    test("Deal card to faceup", function() {
        var player = new Player("James", 3);
        var card = new Card(Rank.SEVEN, Suit.SPADES);
        player.dealToFaceUp(card);
        
        equal(player.faceup[0], card);
    });

    test("Deal card to facedown", function() {
        var player = new Player("James", 3);
        var card = new Card(Rank.JACK, Suit.HEARTS);
        player.dealToFaceDown(card);
        
        equal(player.facedown[0], card);
    });

    test("Swap first and first", function() {
        var player = new Player("James", 3);

        var threed = new Card(Rank.THREE, Suit.DIAMONDS);
        var sevens = new Card(Rank.SEVEN, Suit.SPADES);
        var aced = new Card(Rank.ACE, Suit.DIAMONDS);
        var twoh = new Card(Rank.TWO, Suit.HEARTS);
        var jackc = new Card(Rank.JACK, Suit.CLUBS);
        var eights = new Card(Rank.EIGHT, Suit.SPADES);
        
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
        var player = new Player("James", 3);

        var threed = new Card(Rank.THREE, Suit.DIAMONDS);
        var sevens = new Card(Rank.SEVEN, Suit.SPADES);
        var aced = new Card(Rank.ACE, Suit.DIAMONDS);
        var twoh = new Card(Rank.TWO, Suit.HEARTS);
        var jackc = new Card(Rank.JACK, Suit.CLUBS);
        var eights = new Card(Rank.EIGHT, Suit.SPADES);
        
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
        var player = new Player("James", 3);

        var threed = new Card(Rank.THREE, Suit.DIAMONDS);
        var sevens = new Card(Rank.SEVEN, Suit.SPADES);
        var aced = new Card(Rank.ACE, Suit.DIAMONDS);
        var twoh = new Card(Rank.TWO, Suit.HEARTS);
        var jackc = new Card(Rank.JACK, Suit.CLUBS);
        var eights = new Card(Rank.EIGHT, Suit.SPADES);
        
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
        var player = new Player("James", 5);

        var threed = new Card(Rank.THREE, Suit.DIAMONDS);
        var fourd = new Card(Rank.FOUR, Suit.DIAMONDS);
        var jacks = new Card(Rank.JACK, Suit.SPADES);
        var eighth = new Card(Rank.EIGHT, Suit.HEARTS);
        var twoc = new Card(Rank.TWO, Suit.CLUBS);

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

});

