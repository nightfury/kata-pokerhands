import pokerhands from './index'

describe('kata-pokerhands', () => {
  describe('#rankHands', () => {
    it('should require two hands', () => {
      expect(pokerhands.rankHands).to.throw('needs two hands')
    })
  })

  describe('#sortHand', () => {
    it('should sort a hand, lowest to highest value', () => {
      let sortedHand = pokerhands.sortHand([
        { value: 'A', suite: 'Diamonds' },
        { value: '8', suite: 'Diamonds' }
      ])
      expect(sortedHand).to.deep.equal([
        { value: '8', suite: 'Diamonds' },
        { value: 'A', suite: 'Diamonds' }
      ])
    })
  })

  describe('#isRoyalFlush', () => {
    context('when the hand is a royal flush', () => {
      it('should return true', () => {
        let isRoyalFlush = pokerhands.isRoyalFlush([
          { value: 'A', suit: 'Diamonds' },
          { value: 'K', suit: 'Diamonds' },
          { value: 'Q', suit: 'Diamonds' },
          { value: 'J', suit: 'Diamonds' },
          { value: 10, suit: 'Diamonds' }
        ])
        expect(isRoyalFlush).to.equal(true)
      })
    })

    context('when the hand has a card that is not in a royal flush', () => {
      it('should return false ', () => {
        let isRoyalFlush = pokerhands.isRoyalFlush([
          { value: 'A', suit: 'Diamonds' },
          { value: 'K', suit: 'Diamonds' },
          { value: 3,  suit: 'Diamonds' },
          { value: 'J', suit: 'Diamonds' },
          { value: 10, suit: 'Diamonds' }
        ])
        expect(isRoyalFlush).to.equal(false)
      })
    })

    context('when the hand has duplicate royal flush cards', () => {
      it('should return false', () => {
        let isRoyalFlush = pokerhands.isRoyalFlush([
          { value: 'A', suit: 'Diamonds' },
          { value: 'K', suit: 'Diamonds' },
          { value: 'K', suit: 'Hearts' },
          { value: 'J', suit: 'Diamonds' },
          { value: 10, suit: 'Diamonds' }
        ])
        expect(isRoyalFlush).to.equal(false)
      })
    })

    context('when the hand is not also a straight flush', () => {
      it('should return false', () => {
        let isRoyalFlush = pokerhands.isRoyalFlush([
          { value: 'A', suit: 'Diamonds' },
          { value: 'K', suit: 'Hearts' },
          { value: 'Q', suit: 'Diamonds' },
          { value: 'J', suit: 'Diamonds' },
          { value: 10, suit: 'Diamonds' }
        ])
        expect(isRoyalFlush).to.equal(false)
      })
    })
  })

  describe('#isStraightFlush', () => {
    context('when the hand is a straight flush', () => {
      it('should return true', () => {
        let isStraightFlush = pokerhands.isStraightFlush([
          { value: 3, suit: 'Diamonds' },
          { value: 4, suit: 'Diamonds' },
          { value: 5, suit: 'Diamonds' },
          { value: 6, suit: 'Diamonds' },
          { value: 7, suit: 'Diamonds' }
        ])
        expect(isStraightFlush).to.equal(true)
      })
    })

    context('when the hand is an unsorted straight flush', () => {
      it('should return true', () => {
        let isStraightFlush = pokerhands.isStraightFlush([
          { value: 5, suit: 'Diamonds' },
          { value: 7, suit: 'Diamonds' },
          { value: 3, suit: 'Diamonds' },
          { value: 6, suit: 'Diamonds' },
          { value: 4, suit: 'Diamonds' }
        ])
        expect(isStraightFlush).to.equal(true)
      })
    })

    context('when the hand is not of the same suit', () => {
      it('should return false', () => {
        let isStraightFlush = pokerhands.isStraightFlush([
          { value: 3, suit: 'Hearts' },
          { value: 4, suit: 'Diamonds' },
          { value: 5, suit: 'Diamonds' },
          { value: 6, suit: 'Diamonds' },
          { value: 7, suit: 'Diamonds' }
        ])
        expect(isStraightFlush).to.equal(false)
      })
    })

    context('when the hand does not have consecutive values', () => {
      it('should return false', () => {
        let isStraightFlush = pokerhands.isStraightFlush([
          { value: 3, suit: 'Hearts' },
          { value: 4, suit: 'Hearts' },
          { value: 5, suit: 'Hearts' },
          { value: 6, suit: 'Hearts' },
          { value: 10, suit: 'Hearts' }
        ])
        expect(isStraightFlush).to.equal(false)
      })
    })
  })

  describe('#isFourOfAKind', () => {
    it('should count the occurances of the card values in the hand', sinon.test(function() {
      this.spy(pokerhands, 'countOccurrancesOfCardValues')
      pokerhands.isFourOfAKind([
        { value: 3, suit: 'Hearts' },
        { value: 3, suit: 'Clubs' },
        { value: 3, suit: 'Diamonds' },
        { value: 4, suit: 'Hearts' },
        { value: 4, suit: 'Spades' }
      ])
      expect(pokerhands.countOccurrancesOfCardValues).to.have.been.calledOnce
    }))

    context('when the hand is four of a kind', () => {
      it('should return true', () => {
        let isFourOfAKind = pokerhands.isFourOfAKind([
          { value: 3, suit: 'Hearts' },
          { value: 3, suit: 'Clubs' },
          { value: 3, suit: 'Diamonds' },
          { value: 3, suit: 'Spades' },
          { value: 4, suit: 'Spades' }
        ])
        expect(isFourOfAKind).to.equal(true)
      })
    })

    context('when the hand has less than 4 cards of equal value', () => {
      it('should return false ', () => {
        let isFourOfAKind = pokerhands.isFourOfAKind([
          { value: 3, suit: 'Hearts' },
          { value: 3, suit: 'Clubs' },
          { value: 3, suit: 'Diamonds' },
          { value: 6, suit: 'Spades' },
          { value: 4, suit: 'Spades' }
        ])
        expect(isFourOfAKind).to.equal(false)
      })
    })
  })

  describe('#isFullHouse', () => {
    it('should validate the hand', sinon.test(function() {
      this.spy(pokerhands, 'isValidHand')
      pokerhands.isFullHouse()
      expect(pokerhands.isValidHand).to.have.been.called
    }))

    it('should count the occurances of the card values in the hand', sinon.test(function() {
      this.spy(pokerhands, 'countOccurrancesOfCardValues')
      pokerhands.isFullHouse([
        { value: 3, suit: 'Hearts' },
        { value: 3, suit: 'Clubs' },
        { value: 3, suit: 'Diamonds' },
        { value: 4, suit: 'Hearts' },
        { value: 4, suit: 'Spades' }
      ])
      expect(pokerhands.countOccurrancesOfCardValues).to.have.been.calledOnce
    }))

    context('when the hand contains 3 cards of the same value, with the remaining 2 cards forming a pair', () => {
      it('should return true', () => {
        const isFullHouse = pokerhands.isFullHouse([
          { value: 3, suit: 'Hearts' },
          { value: 3, suit: 'Clubs' },
          { value: 3, suit: 'Diamonds' },
          { value: 4, suit: 'Hearts' },
          { value: 4, suit: 'Spades' }
        ])
        expect(isFullHouse).to.equal(true)
      })
    })

    context('when the hand does not contain a full house', () => {
      it('should return false', () => {
        const isFullHouse = pokerhands.isFullHouse([
          { value: 3, suit: 'Hearts' },
          { value: 3, suit: 'Clubs' },
          { value: 3, suit: 'Diamonds' },
          { value: 6, suit: 'Spades' },
          { value: 4, suit: 'Spades' }
        ])
        expect(isFullHouse).to.equal(false)
      })
    })
  })

  describe('#isValidHand', () => {
    context('when a hand has more than 5 cards', () => {
      it('should return false', () => {
        expect(pokerhands.isValidHand([
          { value: 3, suit: 'Diamonds' },
          { value: 6, suit: 'Spades' },
          { value: 4, suit: 'Spades' },
          { value: 5, suit: 'Diamonds' },
          { value: 6, suit: 'Diamonds' },
          { value: 7, suit: 'Diamonds' }
        ])).to.equal(false)
      })
    })

    context('when a hand has less than 5 cards', () => {
      it('should return false', () => {
        expect(pokerhands.isValidHand([
          { value: 3, suit: 'Diamonds' },
          { value: 6, suit: 'Spades' },
          { value: 4, suit: 'Spades' },
          { value: 5, suit: 'Diamonds' }
        ])).to.equal(false)
      })
    })

    context('when a hand has 5 cards', () => {
      let isValidHand

      before(() => {
        sinon.spy(pokerhands, 'isValidCard')
        isValidHand = pokerhands.isValidHand([
          { value: 3, suit: 'Diamonds' },
          { value: 6, suit: 'Spades' },
          { value: 4, suit: 'Spades' },
          { value: 'A', suit: 'Clubs' },
          { value: 7, suit: 'Hearts' }
        ])
      })

      after(() => {
        pokerhands.isValidCard.restore()
      })

      it('should validate each card', sinon.test(() => {
        expect(pokerhands.isValidCard.callCount).to.equal(5)
      }))

      it('should return true', () => {
        expect(isValidHand).to.equal(true)
      })
    })
  })

  describe('#isValidCard', () => {
    context('when a card has a value and suit', () => {
      it('should return true', () => {
        expect(pokerhands.isValidCard(
          { value: 5, suit: 'Spades' }
        )).to.equal(true)
      })
    })

    context('when a card is missing a suit', () => {
      it('should return false', () => {
        expect(pokerhands.isValidCard(
          { value: 3 }
        )).to.equal(false)
      })
    })

    context('when a card is missing a value', () => {
      it('should return false', () => {
        expect(pokerhands.isValidCard(
          { suit: 'Spades' }
        )).to.equal(false)
      })
    })

    context('when a card has an invalid value', () => {
      it('should return false', () => {
        expect(pokerhands.isValidCard(
          { value: 11, suit: 'Spades' }
        )).to.equal(false)
      })
    })

    context('when a card has an invalid suit', () => {
      it('should return false', () => {
        expect(pokerhands.isValidCard(
          { value: 'K', suit: 'Spoons' }
        )).to.equal(false)
      })
    })
  })

  describe('#isPair', () => {
    it('should validate the hand', sinon.test(function() {
      this.spy(pokerhands, 'isValidHand')
      pokerhands.isPair()
      expect(pokerhands.isValidHand).to.have.been.called
    }))

    it('should count the pairs in the hand', sinon.test(function() {
      this.spy(pokerhands, 'countPairs')
      pokerhands.isPair([
        { value: 'A', suit: 'Diamonds' },
        { value: 'A', suit: 'Spades' },
        { value: 'Q', suit: 'Diamonds' },
        { value: 'J', suit: 'Diamonds' },
        { value: 10, suit: 'Diamonds' }
      ])
      expect(pokerhands.countPairs).to.have.been.calledOnce
    }))

    context('when 2 of the 5 cards in the hand have the same value', () => {
      it('should return true', () => {
        expect(pokerhands.isPair([
          { value: 'A', suit: 'Diamonds' },
          { value: 'A', suit: 'Spades' },
          { value: 'Q', suit: 'Diamonds' },
          { value: 'J', suit: 'Diamonds' },
          { value: 10, suit: 'Diamonds' }
        ])).to.equal(true)
      })
    })

    context('when more than 2 cards have the same value', () => {
      context('and there isn\'t another pair', () => {
        it('should return false', () => {
          expect(pokerhands.isPair([
            { value: 'A', suit: 'Diamonds' },
            { value: 'A', suit: 'Spades' },
            { value: 'A', suit: 'Hearts' },
            { value: 'J', suit: 'Diamonds' },
            { value: 10, suit: 'Diamonds' }
          ])).to.equal(false)
        })
      })
    })

    context('when a hand contains 2 pairs', () => {
      it('should return false', () => {
        expect(pokerhands.isPair([
          { value: 'A', suit: 'Diamonds' },
          { value: 'A', suit: 'Spades' },
          { value: 'Q', suit: 'Diamonds' },
          { value: 'Q', suit: 'Clubs' },
          { value: 10, suit: 'Diamonds' }
        ])).to.equal(false)
      })
    })
  })

  describe('#isTwoPair', () => {
    it('should validate the hand', sinon.test(function() {
      this.spy(pokerhands, 'isValidHand')
      pokerhands.isTwoPair()
      expect(pokerhands.isValidHand).to.have.been.called
    }))

    it('should count the pairs in the hand', sinon.test(function() {
      this.spy(pokerhands, 'countPairs')
      pokerhands.isTwoPair([
        { value: 'A', suit: 'Diamonds' },
        { value: 'A', suit: 'Spades' },
        { value: 'Q', suit: 'Diamonds' },
        { value: 'J', suit: 'Diamonds' },
        { value: 10, suit: 'Diamonds' }
      ])
      expect(pokerhands.countPairs).to.have.been.calledOnce
    }))

    context('when the hand contains 2 different pairs', () => {
      it('should return true', () => {
        expect(pokerhands.isTwoPair([
          { value: 'A', suit: 'Diamonds' },
          { value: 'A', suit: 'Spades' },
          { value: 'Q', suit: 'Diamonds' },
          { value: 'Q', suit: 'Hearts' },
          { value: 10, suit: 'Diamonds' }
        ])).to.equal(true)
      })
    })

    context('when the hand doesn\'t contain 2 different pairs', () => {
      it('should return false', () => {
        expect(pokerhands.isTwoPair([
          { value: 'A', suit: 'Diamonds' },
          { value: 'A', suit: 'Spades' },
          { value: 'Q', suit: 'Diamonds' },
          { value: 'K', suit: 'Hearts' },
          { value: 10, suit: 'Diamonds' }
        ])).to.equal(false)
      })
    })
  })

  describe('#countPairs', () => {
    it('should count the occurances of the card values in the hand', sinon.test(function() {
      this.spy(pokerhands, 'countOccurrancesOfCardValues')
      pokerhands.countPairs([
        { value: 'A', suit: 'Diamonds' },
        { value: 'A', suit: 'Spades' },
        { value: 'Q', suit: 'Diamonds' },
        { value: 'J', suit: 'Diamonds' },
        { value: 10, suit: 'Diamonds' }
      ])
      expect(pokerhands.countOccurrancesOfCardValues).to.have.been.calledOnce
    }))

    context('when the hand has one pair', () => {
      let pairCount

      before(() => {
        pairCount = pokerhands.countPairs([
          { value: 'A', suit: 'Diamonds' },
          { value: 'A', suit: 'Spades' },
          { value: 'Q', suit: 'Diamonds' },
          { value: 'J', suit: 'Clubs' },
          { value: 10, suit: 'Diamonds' }
        ])
      })

      it('should return 1', () => {
        expect(pairCount).to.equal(1)
      })
    })

    context('when the hand does not have a pair', () => {
      let pairCount

      before(() => {
        pairCount = pokerhands.countPairs([
          { value: '9', suit: 'Diamonds' },
          { value: 'A', suit: 'Spades' },
          { value: 'Q', suit: 'Diamonds' },
          { value: 'J', suit: 'Clubs' },
          { value: 10, suit: 'Diamonds' }
        ])
      })

      it('should return 0', () => {
        expect(pairCount).to.equal(0)
      })
    })
  })

  describe('#isThreeOfAKind', () => {
    it('should validate the hand', sinon.test(function() {
      this.spy(pokerhands, 'isValidHand')
      pokerhands.isThreeOfAKind()
      expect(pokerhands.isValidHand).to.have.been.called
    }))

    it('should count the occurances of the card values in the hand', sinon.test(function() {
      this.spy(pokerhands, 'countOccurrancesOfCardValues')
      pokerhands.isThreeOfAKind([
        { value: 3, suit: 'Hearts' },
        { value: 3, suit: 'Clubs' },
        { value: 3, suit: 'Diamonds' },
        { value: 4, suit: 'Hearts' },
        { value: 5, suit: 'Spades' }
      ])
      expect(pokerhands.countOccurrancesOfCardValues).to.have.been.calledOnce
    }))

    context('when three of the cards in the hand have the same value', () => {
      it('should return true', () => {
        expect(pokerhands.isThreeOfAKind([
          { value: 3, suit: 'Hearts' },
          { value: 3, suit: 'Clubs' },
          { value: 3, suit: 'Diamonds' },
          { value: 4, suit: 'Hearts' },
          { value: 5, suit: 'Spades' }
        ])).to.equal(true)
      })
    })

    context('when the hand does not have three cards of the same value', () => {
      it('should return false', () => {
        expect(pokerhands.isThreeOfAKind([
          { value: 3, suit: 'Hearts' },
          { value: 2, suit: 'Clubs' },
          { value: 3, suit: 'Diamonds' },
          { value: 4, suit: 'Hearts' },
          { value: 5, suit: 'Spades' }
        ])).to.equal(false)
      })
    })
  })

  describe('#isStraight', () => {
    context('when the hand contains 5 cards with consecutive values', () => {
      it('should return true', () => {
        expect(pokerhands.isStraight([
          { value: 2, suit: 'Hearts' },
          { value: 3, suit: 'Clubs' },
          { value: 4, suit: 'Diamonds' },
          { value: 5, suit: 'Hearts' },
          { value: 6, suit: 'Spades' }
        ])).to.equal(true)
      })
    })

    context('when the hand contains 5 cards with unconsecutive values', () => {
      it('should return false', () => {
        expect(pokerhands.isStraight([
          { value: 2, suit: 'Hearts' },
          { value: 3, suit: 'Clubs' },
          { value: 4, suit: 'Diamonds' },
          { value: 5, suit: 'Hearts' },
          { value: 9, suit: 'Spades' }
        ])).to.equal(false)
      })
    })
  })


  describe('#countOccurrancesOfCardValues', () => {
    let cardValueCounts

    before(() => {
      cardValueCounts = pokerhands.countOccurrancesOfCardValues([
        { value: 'A', suit: 'Diamonds' },
        { value: 'A', suit: 'Spades' },
        { value: 'Q', suit: 'Diamonds' },
        { value: 'J', suit: 'Clubs' },
        { value: 10, suit: 'Diamonds' }
      ])
    })

    it('should correctly count the occurances of card values in a hand', () => {
      expect(cardValueCounts).to.deep.equal({
        A: 2,
        Q: 1,
        J: 1,
        10: 1
      })
    })
  })
})
