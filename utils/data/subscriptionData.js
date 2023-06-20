import { clientCredentials } from '../client';

const getSubscriptions = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/subscriptions?user=${userId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createSubscription = (subscription) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/subscriptions`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const updateSubscription = (subscription) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/subscriptions/${subscription.id}`, {
    method: 'PUT',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export { getSubscriptions, createSubscription, updateSubscription };
