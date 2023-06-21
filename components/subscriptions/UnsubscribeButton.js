import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { checkSubscription, updateSubscription } from '../../api/subscriptionData';

export default function UnsubscribeButton({ authorId }) {
  const { user } = useAuth();
  const router = useRouter();
  const unsubscribe = () => {
    const follower = { followerId: user.id };
    checkSubscription(authorId, follower).then((data) => {
      const payload = {
        id: data.id,
        endedOn: new Date().toLocaleDateString('en-CA'),
      };
      updateSubscription(payload)
        .then(router.reload);
    });
  };

  return (
    <Button onClick={unsubscribe} variant="danger">
      Unsubscribe
    </Button>
  );
}

UnsubscribeButton.propTypes = {
  authorId: propTypes.number.isRequired,
};
