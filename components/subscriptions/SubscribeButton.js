import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createSubscription } from '../../utils/data/subscriptionData';

export default function SubscribeButton() {
  const { user } = useAuth();
  const router = useRouter();
  const { authorId } = router.query;

  const subscribe = () => {
    const subscription = {
      followerId: user.id,
      authorId,
    };
    createSubscription(subscription);
  };

  return (
    <Button onClick={subscribe} variant="primary">
      Subscribe
    </Button>
  );
}
