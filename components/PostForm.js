import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createPost, updatePost } from '../utils/data/postdata';

const initialState = {
  id: '',
  title: '',
  imageUrl: '',
  content: '',
};

const PostForm = ({ post }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentPost, setCurrenPost] = useState(initialState);

  useEffect(() => {
    if (post.id) {
      setCurrenPost((prevState) => ({
        ...prevState,
        id: post.id,
        title: post.title,
        imageUrl: post.image_url,
        content: post.content,
        userId: user.id,
      }));
    }
  }, [post, user]);

  // useEffect(() => {
  //   getSinglePost(post.id).then(setCurrenPost);
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrenPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (post && post.id) {
      const payload = {
        id: currentPost.id,
        title: currentPost.title,
        imageUrl: currentPost.imageUrl,
        content: currentPost.content,
        userId: user.id,
      };
      console.warn({ payload });
      updatePost(currentPost.id, payload)
        .then(() => router.push('/posts/post'));
    } else {
      const payload = { ...currentPost, userId: user.id };
      console.warn('Payload:', payload);
      createPost(payload)
        .then(() => router.push('/posts/post'));
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            placeholder="What's this post called?"
            required
            value={currentPost.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            name="imageUrl"
            placeholder="Place your url here?"
            required
            value={currentPost.imageUrl}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            name="content"
            required
            value={currentPost.content}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit">{ post && post.id ? 'Update' : 'Create'} Post</Button>

      </Form>
    </>
  );
};

PostForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    userId: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  post: {
    id: 0,
    title: '',
    image_url: '',
    content: '',
  },
};

export default PostForm;
