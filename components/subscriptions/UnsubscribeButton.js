import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { checkSubscription, updateSubscription } from '../../api/subscriptionData';

export default function UnsubscribeButton({ authorId, onUpdate }) {
  const { user } = useAuth();
  const unsubscribe = () => {
    const follower = { followerId: user.id };
    checkSubscription(authorId, follower).then((data) => {
      const payload = {
        id: data.id,
        endedOn: new Date().toLocaleDateString('en-CA'),
      };
      updateSubscription(payload)
        .then(onUpdate);
    });
  };

  return (
    <Button className="unsub-btn" onClick={unsubscribe} variant="danger">
      Unsubscribe
    </Button>
  );
}

UnsubscribeButton.propTypes = {
  authorId: propTypes.number.isRequired,
  onUpdate: propTypes.func.isRequired,
};
