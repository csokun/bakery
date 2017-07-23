const items = require('../items');
const debug = require('debug')('order');

module.exports = (orders) => {
    let result = [];

    (orders || []).forEach(order => {
        let item = items.find(it => it.code == order.code);
        
        if (!item) {
            result.push({ 
                order
                , result: []
                , error: `Not available`
            });
            return;
        }

        // To save on shipping space each order should contain the minimal number of packs.
        let collect = [];
        let orderQty = order.qty;
        let bundles = item.bundles || [];

        // bundles is a sorted array object order by qty from large-to-small
        for(i = 0; i < bundles.length; i++) {
            let bundle = bundles[i],
                nextBundle = bundles[i + 1];
            if (orderQty < bundle.qty) continue;
            
            let remainQty = (orderQty % bundle.qty);
            if (remainQty > 0 && nextBundle &&  remainQty < nextBundle.qty)
                continue;

            let unit = parseInt(orderQty / bundle.qty);
            debug('code: %s, orderQty: %d, qty: %d, remainQty: %d', order.code, orderQty, bundle.qty, remainQty);
            collect.push(Object.assign({ unit }, bundle));
            
            orderQty = remainQty;
        };
        let ordered = { order, result: collect, error: null };
        if (orderQty > 0) {
            ordered.order.total = 0;
            ordered.result = [];
            ordered.error = `Invalid order - ${item.name} - can order ${bundles.map(bundle => bundle.qty).sort().join(", ")} only.`;
        } else {
            ordered.order.total = collect.reduce((sum, line) => {
                return sum + (line.unit * line.price);
             } , 0);
        }

        result.push( ordered );
    });

    return result;
};
