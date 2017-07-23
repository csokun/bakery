const app = require('../app');
const supertest = require('supertest')(app);
const expect = require('chai').expect;

describe('Bakery', () => {

    describe('Validation', () => {

        [{
            name: 'orders is not given',
            payload: {}
        }, { 
            name: 'orders is null',
            payload: { orders: null } 
        }, { 
            name: 'orders is presented as object',
            payload: { orders: {} } 
        }].forEach(testCase => {
            it(`Should reject request ${testCase.name}`, done => {
                supertest.post('/orders')
                    .send(testCase.payload)
                    .end((err, res) => {
                        if (err) return done(err);
                        
                        expect(res.status).to.equal(400);

                        let data = res.body;
                        expect(data.message).to.equal('Validation error');
                        expect(data.errors).to.have.lengthOf(1);
                        expect(data.errors[0].param).to.equal('orders');
                        expect(data.errors[0].message).to.equal(
                            'Order list not found, please retry e.g { orders:[ { code: string, qty: number } ] }'
                        );

                        done();
                    });
            });
        });

        it('Should reject request if order qty is not an integer', done => {
            let payload = { orders: [{ code: 'VS5' }, { qty: 1 }] };
            supertest.post('/orders')
                .send(payload)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(400);

                    let data = res.body;

                    expect(data.message).to.equal('Validation error');
                    expect(data.errors[0].message).to.equal(`Each order must have a code (string) e.g. { code: 'VS5', qty: 3 }`);
                    expect(data.errors[1].message).to.equal(`Each order must have a qty (number) e.g. { code: 'VS5', qty: 3 }`);
                    done();
                });
        });

    });

    describe('Place Order', () => {
        it('Should be able to accept an order', done => {
            let payload = {
                orders: [
                    { code: 'VS5', qty: 10 }
                ]
            };

            supertest.post('/orders')
                .send(payload)
                .end((err, res) => {
                   if (err) return done(err);

                   let ordered = res.body;
                   expect(ordered[0].order.total).to.equal(17.98);
                   done(); 
                });
        });
    });

});