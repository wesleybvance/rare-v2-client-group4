import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const UserCard = ({
  id,
  firstName,
  lastName,
  bio,
  profileImageUrl,
  email,
  subscriptionCount,
}) => {
  const router = useRouter();

  return (
    <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={profileImageUrl} className="card-img-top" />
      <Card.Body>
        <Card.Title>
          Name: {firstName} {lastName}
        </Card.Title>
        <Card.Subtitle>Email: {email}</Card.Subtitle>
        <Card.Text>{bio}</Card.Text>
        <Button
          onClick={() => {
            router.push(`rareUsers/${id}`);
          }}
        >
          View Profile
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Followers: {subscriptionCount}</Card.Footer>
    </Card>
  );
};
UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  subscriptionCount: PropTypes.number.isRequired,
};

export default UserCard;
