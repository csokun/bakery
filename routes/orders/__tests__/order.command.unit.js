const Command = require('../commands');
const expect = require('chai').expect;

describe('Command::Order', () => {
    
    it('Should pack order with minimal packs', () => {
        let orders = [{
            code: 'VS5',
            qty: 10
        }, {
            code: 'MB11',
            qty: 14
        }, {
            code: 'CF',
            qty: 13
        }];

        let ordered = Command.order(orders);
        
        expect(ordered).to.have.lengthOf(3);
        expect(ordered[0].result).to.deep.equal([
            {
                "unit": 2,
                "qty": 5,
                "price": 8.99
            }
        ]);
        
        expect(ordered[1].result).to.deep.equal([ 
            {
                "unit": 1,
                "qty": 8,
                "price": 24.85
            }, {
                "unit": 3,
                "qty": 2,
                "price": 9.95
            }
        ]);

        expect(ordered[2].result).to.deep.equal([
            {
                "unit": 2,
                "qty": 5,
                "price": 9.95
            },
            {
                "unit": 1,
                "qty": 3,
                "price": 5.95
            }
        ]);
    });

    it(`Should reject order that can't fit packs model`, () => {
        let orders = [{ code: 'VS5', qty: 7 }];
        let ordered = Command.order(orders);

        expect(ordered).to.have.lengthOf(1);
        expect(ordered[0].result).to.have.lengthOf(0);
        expect(ordered[0].error).to.equal('Invalid order - Vegemite Scroll - can order 3, 5 only.');
    });

});