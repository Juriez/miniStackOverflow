const EventEmitter = require('events');
const eventBus = new EventEmitter();

const subscribeToEvent = (eventName, callback) => {
  eventBus.on(eventName, callback);
};

module.exports = { subscribeToEvent };