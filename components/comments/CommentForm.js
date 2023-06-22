import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { postComment, updateComment } from '../../utils/data/commentData';

const initialState = {
  id: 0,
  content: '',
  authorId: 0,
  postId: '',
  createdOn: '',
};

const CommentForm = ({ user, obj, commentPostId }) => {
  const [currentComment, setCurrentComment] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      setCurrentComment({
        id: obj.id,
        authorId: obj.authorId,
        postId: obj.postId,
        createdOn: obj.createdOn,
        content: obj.content,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const putComment = {
        id: obj.id,
        authorId: obj.authorId,
        content: currentComment.content,
        createdOn: obj.createdOn,
        postId: obj.postId,
      };
      updateComment(putComment).then(
        // () => router.replace(`/posts/${currentComment.postId}`)
        (data) => console.warn(data),
      );
    } else {
      const comment = {
        content: currentComment.content,
        postId: commentPostId.id,
        authorId: user.uid,
      };
      // Send POST request to your API
      postComment(comment).then(() => router.replace(`/posts/${commentPostId.id}`));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingInput1"
            label="Content"
            className="mb-3"
          >
            <Form.Control name="content" type="text" required value={currentComment.content} onChange={handleChange} />
          </FloatingLabel>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

CommentForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    authorId: PropTypes.number,
    postId: PropTypes.number,
    createdOn: PropTypes.string,
  }),
  commentPostId: PropTypes.number,
};

CommentForm.defaultProps = {
  obj: initialState,
  commentPostId: 0,
};

export default CommentForm;
