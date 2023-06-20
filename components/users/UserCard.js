import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const UserCard = ({
  firstName,
  lastName,
  bio,
  profileImageUrl,
  email,
  subscriptionCount,
}) => (
  <Card className="text-center" style={{ width: '18rem' }}>
    <Card.Img variant="top" src={profileImageUrl} />
    <Card.Body>
      <Card.Title>Name: {firstName} {lastName}</Card.Title>
      <Card.Subtitle>Email: {email}</Card.Subtitle>
      <Card.Text>{bio}</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">Followers: {subscriptionCount}</Card.Footer>
  </Card>
);

UserCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  subscriptionCount: PropTypes.number.isRequired,
};

export default UserCard;
