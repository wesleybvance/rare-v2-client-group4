/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { deletePost } from '../utils/data/postdata';
import { useAuth } from '../utils/context/authContext';

const PostCard = ({
  id,
  userId,
  title,
  publicationDate,
  imageUrl,
  content,
  onUpdate,
}) => {
  const deleteThisPost = () => {
    console.warn('Deleting post with ID:', id);
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => onUpdate());
    }
  };
  const router = useRouter();
  const { user } = useAuth();
  const isCurrentUserPost = user && user.id === userId.id;
  const formattedDate = new Date(publicationDate).toLocaleDateString();

  return (
    <Card className="text-center">
      <Link href={`/posts/${id}`} passHref>
        <Card.Header style={{ cursor: 'pointer' }}>{title}</Card.Header>
      </Link>
      <Card.Body>
        <Image src={imageUrl} alt={title} style={{ width: 'auto', height: 'auto' }} />
        <Card.Text>{formattedDate}</Card.Text>
        <Card.Text>{userId.first_name} {userId.last_name}</Card.Text>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      {isCurrentUserPost ? (
        <>
          <Button
            className="edit-btn"
            onClick={() => {
              router.push(`/posts/edit/${id}`);
            }}
          >
            Edit Post
          </Button>
          <Button
            className="delete-btn"
            onClick={deleteThisPost}
          >
            Delete
          </Button>
        </>
      ) : null}
    </Card>
  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  publicationDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
