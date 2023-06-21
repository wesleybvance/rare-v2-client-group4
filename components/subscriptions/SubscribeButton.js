import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createSubscription } from '../../api/subscriptionData';

export default function SubscribeButton({ authorId }) {
  const { user } = useAuth();
  const router = useRouter();

  const subscribe = () => {
    const subscription = {
      followerId: user.id,
      authorId,
    };
    createSubscription(subscription).then(router.reload);
  };

  return (
    <Button onClick={subscribe} variant="primary">
      Subscribe
    </Button>
  );
}

SubscribeButton.propTypes = {
  authorId: propTypes.number.isRequired,
};
