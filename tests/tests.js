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

    test("Test create player", function() {
        var player = new Player("James", 3);
        equal(player.name, "James");
    });

});

