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
    <Card className="post-card text-center">
      <Card.Header className="post-header" style={{ cursor: 'pointer' }}>
        {isCurrentUserPost ? (
          <Button
            className="delete-btn"
            onClick={deleteThisPost}
          >
            x
          </Button>
        ) : null}
        <Link href={`/posts/${id}`} passHref><Card.Text className="post-title-link">{title}</Card.Text></Link>
      </Card.Header>
      <Card.Body>
        <Image className="post-img" src={imageUrl} alt={title} style={{ width: 'auto', height: 'auto' }} />
        <Link href={`/rareUsers/${userId.id}`} passHref><Card.Text className="post-user-link">by {userId.first_name} {userId.last_name}</Card.Text></Link>
        <Card.Text className="post-date">{formattedDate}</Card.Text>
        <Card.Text className="post-content">{content}</Card.Text>
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
