import { clientCredentials } from '../utils/client';

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rare_users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rare_users/${uid}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getUsers,
  getSingleUser,
};
