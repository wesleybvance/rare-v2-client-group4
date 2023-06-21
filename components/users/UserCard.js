import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { checkSubscription } from '../../api/subscriptionData';
import SubscribeButton from '../subscriptions/SubscribeButton';
import UnsubscribeButton from '../subscriptions/UnsubscribeButton';

const UserCard = ({
  firstName,
  lastName,
  bio,
  profileImageUrl,
  email,
  subscriptionCount,
  id,
}) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(false);

  const checkSubs = () => {
    const payload = { followerId: user.id };
    checkSubscription(id, payload)
      .then(setSubscription);
  };
  useEffect(() => {
    checkSubs();
  }, []);

  return (
    <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={profileImageUrl} />
      <Card.Body>
        <Card.Title>Name: {firstName} {lastName}</Card.Title>
        <Card.Subtitle>Email: {email}</Card.Subtitle>
        <Card.Text>{bio}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Followers: {subscriptionCount}</Card.Footer>
      <Card.Footer>
        {id !== user.id && !subscription ? <SubscribeButton authorId={id} /> : ''}
        {id !== user.id && subscription ? <UnsubscribeButton authorId={id} /> : ''}
      </Card.Footer>
    </Card>
  );
};

UserCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  subscriptionCount: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default UserCard;
