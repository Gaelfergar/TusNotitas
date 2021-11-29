//Timestamp que dice hace cuánto tiempo se creó una nota

const { format } = require('timeago.js');

const helpers = {};

helpers.timeago = (savedTimestamp) => {
    return format(savedTimestamp);
};

module.exports = helpers;