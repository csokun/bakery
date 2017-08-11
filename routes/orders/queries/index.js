const ITEMS = require('../items');

module.exports = {
    getItems
};

function getItems() {
    return Promise.resolve(ITEMS.map(item => {
        return { code: item.code, name: item.name };
    }));
}