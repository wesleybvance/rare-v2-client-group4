/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteComment } from '../../utils/data/commentData';

export default function CommentCard({
  id,
  postId, //
  authorId,
  content,
  createdOn,
  onUpdate,
}) {
  const router = useRouter();

  const deleteCommentCard = () => {
    if (window.confirm('Do you want to delete this comment?')) {
      deleteComment(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>comment by {authorId}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      <Button className="edit-comment" variant="black" onClick={(e) => router.replace(`/comments/edit/${id}`)}>Edit Game</Button>
      <Button className="delete-comment" variant="black" onClick={deleteCommentCard}>Delete Comment</Button>
    </Card>
  );
}

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  createdOn: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
