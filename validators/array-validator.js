const validator = require('validator');
const objectPath = require("object-path");

exports.isArray = (value) => {
    return Array.isArray(value);
};

exports.eachNotEmpty = (elements, prop) => {
    return elements.every(item => {
        let currentValue = objectPath.get(item, prop);
        return !!currentValue || (currentValue && currentValue.trim().length > 0);
    });
};

exports.eachIsInt = (elements, prop) => {
    return elements.every(item => {
        let currentValue = objectPath.get(item, prop);
        return !!currentValue || validator.isInt(+currentValue);
    });
};