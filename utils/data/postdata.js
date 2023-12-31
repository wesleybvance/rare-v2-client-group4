import { clientCredentials } from '../client';

const getPosts = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSinglePost = (id) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve a single post by its ID
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.warn('Error fetching post:', error);
      reject(error);
    });
});

const createPost = (post) => fetch(`${clientCredentials.databaseURL}/posts`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(post),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error creating Post:', error);
    throw error;
  });

const deletePost = (post) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${post}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updatePost = (id, currentPost) => fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(currentPost),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error updating game:', error);
    throw error;
  });

const getPostsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts?user=${userId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getPosts, createPost, deletePost, updatePost, getSinglePost, getPostsByUser,
};
