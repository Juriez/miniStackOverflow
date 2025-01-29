const EventEmitter = require('events');
const eventBus = new EventEmitter();

const publishEvent = (eventName, data) => {
  eventBus.emit(eventName, data);
};

module.exports = { publishEvent };