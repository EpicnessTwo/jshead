Rank = {
    TWO:2, THREE:3, FOUR:4, FIVE:5, SIX:6, SEVEN:7, EIGHT:8, NINE:9,
    TEN:10, JACK:11, QUEEN:12, KING:13, ACE:14
}

Suit = {
    HEARTS:1, CLUBS:2, DIAMONDS:3, SPADES:4
}

function rankstr(rank) {
    switch(rank) {
    case(Rank.TWO):   return "TWO";
    case(Rank.THREE): return "THREE";
    case(Rank.FOUR):  return "FOUR";
    case(Rank.FIVE):  return "FIVE";
    case(Rank.SIX):   return "SIX";
    case(Rank.SEVEN): return "SEVEN";
    case(Rank.EIGHT): return "EIGHT";
    case(Rank.NINE):  return "NINE";
    case(Rank.TEN):   return "TEN";
    case(Rank.JACK):  return "JACK";
    case(Rank.QUEEN): return "QUEEN";
    case(Rank.KING):  return "KING";
    case(Rank.ACE):   return "ACE";
    default           : return undefined;
    }
}

function suitstr(suit) {
    switch(suit) {
    case(Suit.HEARTS):   return "HEARTS";
    case(Suit.CLUBS):    return "CLUBS";
    case(Suit.DIAMONDS): return "DIAMONDS";
    case(Suit.SPADES):   return "SPADES";
    default:             return undefined;
    }
}

function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.toString = toString;

    function toString() {
        return rankstr(this.rank) + " of " + suitstr(this.suit);
    }
}
