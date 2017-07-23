/**
 * *******************************************************************************
 * COMMAND REGISTER
 * *******************************************************************************
 * In simple scenario we can just implement command function within this script.
 * However, it is highly recommend split each command to its own script.
 * Because it is not fun to scroll through large chunk of code, unless it is your
 * pass time habit or you enjoy resolve merging conflict.
 */
module.exports = {
    order: require('./order.command')
};