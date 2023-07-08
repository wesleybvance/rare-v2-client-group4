import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createSubscription } from '../../api/subscriptionData';

export default function SubscribeButton({ authorId, onUpdate }) {
  const { user } = useAuth();

  const subscribe = () => {
    const subscription = {
      followerId: user.id,
      authorId,
    };
    createSubscription(subscription).then(onUpdate);
  };

  return (
    <Button className="sub-btn" onClick={subscribe} variant="primary">
      Subscribe
    </Button>
  );
}

SubscribeButton.propTypes = {
  authorId: propTypes.number.isRequired,
  onUpdate: propTypes.func.isRequired,
};
