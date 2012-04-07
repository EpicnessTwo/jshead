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

        rankstr: function (r) {
            switch(r) {
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

        suitstr: function (s) {
            switch(s) {
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

            for (i = 1; i < cards.length; i++) {
                if (!(SH.card.rankCompare(first, cards[i]) == 0)) {
                    return false;
                }
            }
            
            return true;
        },

        card: function (r, s) {
            return {
                getRank: function () {
                    return r;
                },

                getSuit: function () {
                    return s;
                },

                toString: function () {
                    return SH.card.rankstr(r) + 
                        " of " + SH.card.suitstr(s);
                },

                isSpecial: function () {
                    return (r == 2 || r == 7 || r == 10);
                },

                isInvisible: function () {
                    return (r == 7);
                },

                isBurnCard: function () {
                    return (r == 10);
                },

                isMissAGoCard: function () {
                    return (r == 8);
                }
            };
        }
    };
}());
