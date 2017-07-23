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
        
        expect(ordered[0].order.total).to.equal(17.98);
        expect(ordered[1].order.total).to.equal(54.8);
        expect(ordered[2].order.total).to.equal(25.85);
    });

    it(`Should reject order that can't fit packs model`, () => {
        let orders = [{ code: 'VS5', qty: 7 }];
        let ordered = Command.order(orders);

        expect(ordered).to.have.lengthOf(1);
        expect(ordered[0].result).to.have.lengthOf(0);
        expect(ordered[0].error).to.equal('Invalid order - Vegemite Scroll - can order 3, 5 only.');
    });

});