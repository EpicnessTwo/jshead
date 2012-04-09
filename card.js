var SH = SH || {};

SH.card = SH.card || (function () {

    return {

        rank: {
            TWO:2, THREE:3, FOUR:4, FIVE:5, SIX:6, SEVEN:7, EIGHT:8, NINE:9,
            TEN:10, JACK:11, QUEEN:12, KING:13, ACE:14
        },

        suit: {
            HEARTS:1, CLUBS:2, DIAMONDS:3, SPADES:4
        },

        rankstr: function (rank) {
            switch(rank) {
            case(SH.card.rank.TWO):   return "TWO";
            case(SH.card.rank.THREE): return "THREE";
            case(SH.card.rank.FOUR):  return "FOUR";
            case(SH.card.rank.FIVE):  return "FIVE";
            case(SH.card.rank.SIX):   return "SIX";
            case(SH.card.rank.SEVEN): return "SEVEN";
            case(SH.card.rank.EIGHT): return "EIGHT";
            case(SH.card.rank.NINE):  return "NINE";
            case(SH.card.rank.TEN):   return "TEN";
            case(SH.card.rank.JACK):  return "JACK";
            case(SH.card.rank.QUEEN): return "QUEEN";
            case(SH.card.rank.KING):  return "KING";
            case(SH.card.rank.ACE):   return "ACE";
            default:          return undefined;
            }
        },

        suitstr: function (suit) {
            switch(suit) {
            case(SH.card.suit.HEARTS):   return "HEARTS";
            case(SH.card.suit.CLUBS):    return "CLUBS";
            case(SH.card.suit.DIAMONDS): return "DIAMONDS";
            case(SH.card.suit.SPADES):   return "SPADES";
            default:             return undefined;
            }
        },

        rankCompare: function (c1, c2) {
            if (c1.getRank() < c2.getRank()) {
                return -1;
            } else if (c1.getRank() == c2.getRank()) {
                return 0;
            } else {
                return 1;
            }
        },

        shCompare: function (c1, c2) {
            if (c1.isSpecial() && c2.isSpecial()) {
                return (SH.card.rankCompare(c1, c2));
            } else if (c1.isSpecial() && !c2.isSpecial()) {
                return 1;
            } else if (c2.isSpecial()) {
                return -1;
            } else {
                return SH.card.rankCompare(c1, c2);
            }
        },

        allRanksEqual: function (cards) {
            var first = cards[0];

            for (var i = 1, len = cards.length; i < len; i++) {
                if (!(SH.card.rankCompare(first, cards[i]) == 0)) {
                    return false;
                }
            }
            
            return true;
        },

        card: function (rank, suit) {
            return {
                getRank: function () {
                    return rank;
                },

                getSuit: function () {
                    return suit;
                },

                toString: function () {
                    return SH.card.rankstr(rank) + 
                        " of " + SH.card.suitstr(suit);
                },

                isSpecial: function () {
                    return (rank == 2 || rank == 7 || rank == 10);
                },

                isInvisible: function () {
                    return (rank == 7);
                },

                isBurnCard: function () {
                    return (rank == 10);
                },

                isMissAGoCard: function () {
                    return (rank == 8);
                }
            };
        }
    };
}());
