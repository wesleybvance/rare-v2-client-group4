/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteComment } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';

export default function CommentCard({
  id,
  postId, //
  authorId,
  content,
  createdOn,
  onUpdate,
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [commentUser, setCommentUser] = useState({});

  const deleteCommentCard = () => {
    if (window.confirm('Do you want to delete this comment?')) {
      deleteComment(id).then(() => onUpdate());
    }
  };

  const getCommentUser = (aid) => {
    getSingleUser(aid).then((data) => setCommentUser(data));
  };

  useEffect(() => {
    getCommentUser(authorId);
  }, [authorId]);

  return (
    <Card className="comment-card text-center">
      <Card.Body>
        <Card.Title className="comment-card-title">
          <Card.Img className="comment-prof-pic" src={commentUser.profile_image_url} />
          <div className="comment-user-cont">
            <Card.Link className="comment-username" href={`/rareUsers/${commentUser.id}`}>{commentUser.first_name} {commentUser.last_name}</Card.Link>
            <Card.Text className="comment-created">{createdOn}</Card.Text>
          </div>
        </Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      {(user.id === authorId) ? (<><Button className="edit-comment" variant="black" onClick={(e) => router.replace(`/comments/edit/${id}`)}>Edit Comment</Button><Button className="delete-comment" variant="black" onClick={deleteCommentCard}>Delete Comment</Button></>) : ''}
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
