var SH = SH || {};

SH.card = SH.card || {};

SH.card.Rank = {
    TWO:2, THREE:3, FOUR:4, FIVE:5, SIX:6, SEVEN:7, EIGHT:8, NINE:9,
    TEN:10, JACK:11, QUEEN:12, KING:13, ACE:14
};

SH.card.Suit = {
    HEARTS:1, CLUBS:2, DIAMONDS:3, SPADES:4
};

SH.card.rankstr = function (rank) {
    switch(rank) {
    case(SH.card.Rank.TWO):   return "TWO";
    case(SH.card.Rank.THREE): return "THREE";
    case(SH.card.Rank.FOUR):  return "FOUR";
    case(SH.card.Rank.FIVE):  return "FIVE";
    case(SH.card.Rank.SIX):   return "SIX";
    case(SH.card.Rank.SEVEN): return "SEVEN";
    case(SH.card.Rank.EIGHT): return "EIGHT";
    case(SH.card.Rank.NINE):  return "NINE";
    case(SH.card.Rank.TEN):   return "TEN";
    case(SH.card.Rank.JACK):  return "JACK";
    case(SH.card.Rank.QUEEN): return "QUEEN";
    case(SH.card.Rank.KING):  return "KING";
    case(SH.card.Rank.ACE):   return "ACE";
    default:                  return undefined;
    }
};

SH.card.suitstr = function (suit) {
    switch(suit) {
    case(SH.card.Suit.HEARTS):   return "HEARTS";
    case(SH.card.Suit.CLUBS):    return "CLUBS";
    case(SH.card.Suit.DIAMONDS): return "DIAMONDS";
    case(SH.card.Suit.SPADES):   return "SPADES";
    default:                     return undefined;
    }
};

SH.card.Card = function (rank, suit) {
    this.rank = rank;
    this.suit = suit;

    this.toString = function() {
        return SH.card.rankstr(this.rank) + " of " + SH.card.suitstr(this.suit);
    };

    this.isSpecial = function() {
        return (this.rank == 2 || this.rank == 7 || this.rank == 10);
    };

    this.isInvisible = function() {
        return (this.rank == 7);
    };

    this.isBurnCard = function() {
        return (this.rank == 10);
    };

    this.isMissAGoCard = function() {
        return (this.rank == 8);
    };
};

SH.card.rankCompare = function (c1, c2) {
    if (c1.rank < c2.rank) {
        return -1;
    } else if (c1.rank == c2.rank) {
        return 0;
    } else {
        return 1;
    }
};

SH.card.shCompare = function (c1, c2) {
    if (c1.isSpecial() && c2.isSpecial()) {
        return (SH.card.rankCompare(c1, c2));
    } else if (c1.isSpecial() && !c2.isSpecial()) {
        return 1;
    } else if (c2.isSpecial()) {
        return -1;
    } else {
        return SH.card.rankCompare(c1, c2);
    }
};

SH.card.allRanksEqual = function (cards) {
    var first = cards[0];

    for (i = 1; i < cards.length; i++) {
        if (!(SH.card.rankCompare(first, cards[i]) == 0)) {
            return false;
        }
    }
    
    return true;
};
