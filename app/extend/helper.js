'use strict';
const utility = require('utility');
const moment = require('moment');
module.exports = {
  returnArgument() {
    return arguments;
  },
  md5(text) {
    return utility.md5(text);
  },
  sha(text) {
    return utility.sha256(text);
  },
  relativeTime(time) {
    return moment(new Date(time * 1000)).fromNow();
  },
};
