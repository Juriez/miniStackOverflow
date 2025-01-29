const { subscribeToEvent } = require('../config/eventSubscriber'); // Import event subscriber
const Notification = require('../models/Notification');

subscribeToEvent('postCreated', async (data) => {
  const { email, postId, title } = data;
  const notification = new Notification({
    email,
    postId,
    message: `New post: ${title}`,
  });
  await notification.save();
});