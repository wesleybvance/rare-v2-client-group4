/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { checkSubscription } from '../../api/subscriptionData';
import SubscribeButton from '../subscriptions/SubscribeButton';
import UnsubscribeButton from '../subscriptions/UnsubscribeButton';

const UserCard = ({
  id,
  firstName,
  lastName,
  bio,
  profileImageUrl,
  email,
  subscriptionCount,
  onUpdate,
}) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(false);
  const router = useRouter();

  const checkSubs = () => {
    const payload = { followerId: user.id };
    checkSubscription(id, payload)
      .then(setSubscription);
    onUpdate();
  };
  useEffect(() => {
    checkSubs();
  }, []);

  return (
    <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={profileImageUrl} />
      <Card.Body>
        <Card.Title className="post-title-link">{firstName} {lastName}</Card.Title>
        <Card.Subtitle className="post-content">Email: {email}</Card.Subtitle>
        <Card.Text className="post-content">{bio}</Card.Text>
        <Button
          className="view-btn"
          onClick={() => {
            router.push(`rareUsers/${id}`);
          }}
        >
          View Profile
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Followers: {subscriptionCount}</Card.Footer>
      <Card.Footer>
        {id !== user.id && !subscription ? <SubscribeButton authorId={id} onUpdate={checkSubs} /> : ''}
        {id !== user.id && subscription ? <UnsubscribeButton authorId={id} onUpdate={checkSubs} /> : ''}
      </Card.Footer>
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
  onUpdate: PropTypes.func.isRequired,
};

export default UserCard;
