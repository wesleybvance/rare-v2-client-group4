/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { deletePost } from '../utils/data/postdata';

const PostCard = ({
  id,
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

  const formattedDate = new Date(publicationDate).toLocaleDateString();
  return (
    <Card className="text-center">
      <Link href={`/posts/${id}`} passHref>
        <Card.Header style={{ cursor: 'pointer' }}>{title}</Card.Header>
      </Link>
      <Card.Body>
        <img src={imageUrl} alt={title} style={{ width: '100%', height: 'auto' }} />
        <Card.Text>{formattedDate}</Card.Text>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
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
    </Card>
  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  publicationDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
