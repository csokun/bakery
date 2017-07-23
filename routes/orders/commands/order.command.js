const items = require('../items');
const debug = require('debug')('order');

module.exports = (orders) => {
    let results = [];

    (orders || []).forEach(order => {
        let item = items.find(it => it.code == order.code);
        
        if (!item) {
            results.push({ 
                order
                , result: []
                , error: `Not available`
            });
            return;
        }

        // To save on shipping space each order should contain the minimal number of packs.
        let bundles = item.bundles || [];
        let fit = _bestFit(order.qty, bundles);

        // retry
        for(i = 0; i < bundles.length; i++) {
            let bundleCounter = bundles.length - i;
            while (fit.remainQty != 0 && bundleCounter != 0) {
                bundles = [bundles[i], ... bundles.slice(2)];
                fit = _bestFit(order.qty, bundles);
                bundleCounter--;
            }

            bundles = [item.bundles[i], ...item.bundles.slice(i + 1)];
            if (fit.remainQty == 0) break;
        }

        // prepare result object
        order.total = 0;
        let ordered = { order, result: [], error: null };

        if (fit.remainQty > 0) {
            ordered.error = `Invalid order - ${item.name} - can order ${item.bundles.map(bundle => bundle.qty).sort().join(", ")} only.`;
        } else {
            Object.keys(fit.packs).filter(prop => prop.indexOf('_') == -1)
            .forEach(qty => {
                if (fit.packs[qty] == 0) return;

                let price = fit.packs[qty + '_price'];
                let unit = fit.packs[qty];
                let total = unit * price;
                
                ordered.result.push({ unit, qty: +qty, price });
                ordered.order.total += total;
            });
            
            ordered.order.total = +ordered.order.total.toFixed(2);
        }

        results.push( ordered );
    });

    return results;
};

function _bestFit (qty, bundles, packs = {}) {
    packs = packs || {};

    if (qty == 0 || bundles.length == 0) {
        return { remainQty: qty, packs };
    }
    let bundle = bundles[0];
    packs[bundle.qty] = Math.trunc(qty / bundle.qty)
    packs[bundle.qty + "_price"] = bundle.price;

    qty = qty % bundle.qty;
    return _bestFit (qty, bundles.slice(1), packs);
}