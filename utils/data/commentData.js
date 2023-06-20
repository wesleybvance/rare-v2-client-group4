import { clientCredentials } from '../client';

const deleteComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const postComment = (uid, postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${postId}/post_comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  deleteComment, postComment,
};
